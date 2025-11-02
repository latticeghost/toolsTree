const { PDFDocument, PageSizes } = require('pdf-lib');
const sharp = require('sharp');

// Increase the payload size limit for Vercel
module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { images, options } = req.body;

    if (!images || !options) {
      return res.status(400).json({ error: 'Missing images or options.' });
    }

    const newPdf = await PDFDocument.create();
    
    const PAGE_SIZES = {
        a4: [PageSizes.A4[0], PageSizes.A4[1]],
        letter: [PageSizes.Letter[0], PageSizes.Letter[1]]
    };

    for (const imgData of images) {
      // 1. Get the base64 data and buffer
      const base64Data = imgData.dataUrl.split(',')[1];
      const imgBuffer = Buffer.from(base64Data, 'base64');
      
      // 2. We force *every* image (JPG, PNG, etc.)
      //    through sharp to launder it into a clean, standard PNG
      const cleanPngBuffer = await sharp(imgBuffer)
        .ensureAlpha() 
        .png({ force: true })
        .toBuffer();

      // 3. We ONLY use embedPng, as we now have a clean PNG buffer.
      const image = await newPdf.embedPng(cleanPngBuffer);
      
      const imgWidth = imgData.width;
      const imgHeight = imgData.height;
      const isLandscape = imgWidth > imgHeight;

      let pageWidth, pageHeight;

      if (options.size === 'fit') {
          pageWidth = imgWidth;
          pageHeight = imgHeight;
          const page = newPdf.addPage([pageWidth, pageHeight]);
          page.drawImage(image, { x: 0, y: 0, width: pageWidth, height: pageHeight });
      } else {
          const [stdWidth, stdHeight] = PAGE_SIZES[options.size];
          const setLandscape = (options.orientation === 'auto' && isLandscape) || options.orientation === 'landscape';

          if (setLandscape) {
              pageWidth = stdHeight;
              pageHeight = stdWidth;
          } else {
              pageWidth = stdWidth;
              pageHeight = stdHeight;
          }
          
          const page = newPdf.addPage([pageWidth, pageHeight]);
          
          const usableWidth = pageWidth - (options.margin * 2);
          const usableHeight = pageHeight - (options.margin * 2);
          const scaleX = usableWidth / imgWidth;
          const scaleY = usableHeight / imgHeight;
          
          const scale = options.margin === 0 
              ? Math.max(scaleX, scaleY) 
              : Math.min(scaleX, scaleY);

          const newImgWidth = imgWidth * scale;
          const newImgHeight = imgHeight * scale;
          
          page.drawImage(image, {
              x: (pageWidth - newImgWidth) / 2,
              y: (pageHeight - newImgHeight) / 2,
              width: newImgWidth,
              height: newImgHeight,
          });
      }
    }

    // Save the PDF to bytes (which is a Uint8Array)
    const pdfBytes = await newPdf.save();

    // === THIS IS THE FIX ===
    // Convert the Uint8Array to a Node.js Buffer
    // This is the line I was missing.
    const pdfBuffer = Buffer.from(pdfBytes.buffer);
    // === END OF FIX ===

    // Send the PDF back to the browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="toolsTree-images-to-pdf.pdf"');
    // Send the BUFFER, not the Uint8Array
    res.status(200).send(pdfBuffer);

  } catch (err) {
    console.error("Fatal error during PDF creation:", err);
    res.status(500).json({ error: 'Failed to create PDF.', details: err.message });
  }
};