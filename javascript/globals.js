// --- 1. HTML TEMPLATES ---
const HEADER_WITH_SEARCH_HTML = (rootPath) => `
<header class="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="${rootPath}index.html" class="flex items-center space-x-2 text-2xl font-bold shrink-0">
            <i data-lucide="tree-deciduous" class="w-6 h-6 stroke-tt-primary"></i> 
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <div class="flex items-center w-full max-w-md ml-4 sm:ml-8 space-x-3">
            <div class="relative w-full" id="search-container">
                <input type="text" id="global-search" placeholder="Search any tool..." class="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-tt-primary focus:border-tt-primary transition dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100">
                <div id="search-results" 
                     class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 dark:bg-gray-900 dark:border-gray-800
                            transform transition-all duration-300 ease-in-out opacity-0 -translate-y-2 scale-95 hidden">
                </div>
            </div>
            <button id="theme-toggle" class="relative z-10 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-tt-primary shrink-0" aria-label="Toggle dark mode"></button>
        </div>
    </div>
</header>
`;

const HEADER_WITHOUT_SEARCH_HTML = (rootPath) => `
<header class="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="${rootPath}index.html" class="flex items-center space-x-2 text-2xl font-bold">
            <i data-lucide="tree-deciduous" class="w-6 h-6 stroke-tt-primary"></i> 
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <button id="theme-toggle" class="relative z-10 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-tt-primary shrink-0" aria-label="Toggle dark mode"></button>
    </div>
</header>
`;

const FOOTER_HTML = (rootPath) => `
<footer class="text-center text-sm py-6 mt-auto border-t bg-white dark:bg-black dark:border-gray-800">
    <div class="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
        <a href="${rootPath}index.html" class="flex items-center space-x-1 text-sm font-bold hover:text-tt-primary transition">
            <i data-lucide="tree-deciduous" class="w-4 h-4 stroke-tt-primary"></i>
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <a href="${rootPath}about.html" class="hover:text-tt-primary">About Us</a>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <a href="${rootPath}contact.html" class="hover:text-tt-primary">Contact Us</a>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <a href="${rootPath}privacy.html" class="hover:text-tt-primary">Privacy Policy</a>
    </div>
</footer>
`;

// --- 2. TOOL DATA (Centralized for Global Search) ---
const ALL_TOOLS = [
    { name: "Advanced Data Converter", url: "tools/data-converter.html", category: "Data & Developer", icon: "replace", color: "text-tt-primary", description: "Convert Unicode, Hex, Binary, Base64, and URL encoding." },
    { name: "JSON Formatter, Validator & Minifier", url: "tools/json-formatter.html", category: "Data & Developer", icon: "box", color: "text-purple-600", description: "Format, validate, and minify your JSON data instantly." },
    { name: "CSS Grid Generator & Visual Builder", url: "../tools/css-grid-generator.html", category: "Data & Developer", icon: "layout-grid", color: "text-tt-primary", description: "Visually build complex CSS Grid layouts, named areas, and track definitions." },
    { name: "Advanced CSS Gradient Generator", url: "tools/css-gradient-generator.html", category: "Data & Developer", icon: "palette", color: "text-purple-600", description: "Visually create and customize stunning CSS gradients." },
    { name: "JWT Debugger & Verifier", url: "../tools/jwt-debugger.html", category: "Data & Developer", icon: "key-round", color: "text-rose-600", description: "Decode and verify JWTs with HS256/384/512 signature checks." },
    { name: "Mermaid.js Live Editor & Renderer",url: "../tools/mermaid-editor.html",category: "Data & Developer",icon: "workflow", color: "text-emerald-500", description: "Visualize and render diagrams (flowcharts, sequence, class, Gantt) from Mermaid.js code in real-time." },
    { name: "Hash, HMAC & Checksum Generator", url: "tools/hash-generator.html", category: "Networking & Security", icon: "fingerprint", color: "text-red-500", description: "Generate cryptographic hashes from any input text." },
    { name: "IP Address Lookup & Geolocation", url: "../tools/ip-lookup.html", category: "Networking & Security", icon: "map-pin", color: "text-blue-600", description: "Find the geographic location, ISP, and other details of any IP address." },
    { name: "Advanced Subnet Calculator (IPv4)", url: "../tools/subnet-calculator.html", category: "Networking & Security", icon: "binary", color: "text-orange-500", description: "Calculate IP ranges, broadcast addresses, and netmasks for any subnet." },
    { name: "IP Blacklist & Abuse Checker", url: "../tools/ip-blacklist-checker.html", category: "Networking & Security", icon: "shield-alert", color: "text-red-600", description: "Check if an IP is on a blacklist and see its abuse confidence score." },
    { name: "Advanced URL Parser & Decoder", url: "../tools/url-parser.html", category: "Networking & Security", icon: "link-2", color: "text-purple-600", description: "Break down URLs into components and decode query parameters." },
    { name: "Time Zone Converter", url: "tools/time-zone-converter.html", category: "Clock & Time", icon: "globe", color: "text-blue-500", description: "Convert time between multiple global time zones instantly." },
    { name: "All-in-One Case Converter", url: "tools/case-converter.html", category: "Text", icon: "text-cursor-input", color: "text-purple-600", description: "Convert text to UPPERCASE, lowercase, Title Case, and more." },
    { name: "Headline Title Case Converter", url: "tools/headline-title-case.html", category: "Text", icon: "subtitles", color: "text-purple-600", description: "Formats headlines and titles using proper rules." },
    { name: "Real-Time Character Counter, Word, SEO & Readability Counter", url: "../tools/character-counter.html", category: "Text", icon: "ruler", color: "text-cyan-500", description: "Precisely count all characters with and without spaces." },
    { name: "Advanced Text Cleaner & Space Remover", url: "tools/remove-spaces.html", category: "Text", icon: "sparkles", color: "text-blue-500", description: "Remove extra spaces, line breaks, and other cleanup tasks." },
    { name: "Advanced Text Reverser & Flipper", url: "tools/reverse-text.html", category: "Text", icon: "rotate-ccw", color: "text-red-500", description: "Reverse text, words, or lines in multiple configurations." },
    { name: "Loan EMI & Prepayment Calculator", url: "tools/emi-calculator.html", category: "Finance & Money", icon: "banknote", color: "text-blue-500", description: "Estimate your monthly loan payments (EMI) accurately." },
    { name: "SIP Calculator", url: "tools/sip-calculator.html", category: "Finance & Money", icon: "trending-up", color: "text-indigo-600", description: "Project the returns on your Systematic Investment Plan." },
    { name: "Live Currency Converter & Rate Tracker", url: "tools/currency-converter.html", category: "Finance & Money", icon: "dollar-sign", color: "text-teal-500", description: "Convert between various world currencies in real time." },
    { name: "Advanced Retirement Calculator", url: "../tools/retirement-calculator.html", category: "Finance & Money", icon: "briefcase", color: "text-teal-500", description: "Plan for retirement savings and estimate corpus needs." },
    { name: "Advanced RD Calculator", url: "../tools/rd-calculator.html", category: "Finance & Money", icon: "calendar-check", color: "text-orange-500", description: "Determine the maturity value of your Recurring Deposit." },
    { name: "Simple Interest Calculator", url: "../tools/simple-interest.html", category: "Finance & Money", icon: "percent", color: "text-blue-500", description: "Calculate interest on principal without compounding effects." },
    { name: "Ultimate FD Calculator", url: "../tools/fd-calculator.html", category: "Finance & Money", icon: "lock", color: "text-yellow-600", description: "Calculate maturity value for your Fixed Deposit." },
    { name: "Compound Interest Calculator", url: "tools/compound-interest.html", category: "Finance & Money", icon: "piggy-bank", color: "text-green-500", description: "Calculate the future value of your investment with compounding." },
    { name: "Rent vs. Buy Home Calculator", url: "tools/rent-vs-buy-calculator.html", category: "Finance & Money", icon: "scale", color: "text-blue-600", description: "Analyze the financial costs and benefits of renting versus buying." },
    { name: "Image Compressor & Resizer", url: "tools/image-compressor.html", category: "Image & Design", icon: "maximize-2", color: "text-indigo-600", description: "Reduce file size and adjust dimensions of your images." },
    { name: "WCAG Color Contrast Checker", url: "tools/contrast-checker.html", category: "Image & Design", icon: "contrast", color: "text-orange-500", description: "Ensure your colors meet WCAG 2.1 accessibility standards." },
    { name: "Next-Gen Favicon Generator Kit", url: "../tools/favicon-generator.html", category: "Image & Design", icon: "gem", color: "text-blue-500", description: "Create a complete favicon package (ICO, PNG, manifest) from a single image." },
    { name: "Secure Password Generator", url: "tools/password-generator.html", category: "Misc", icon: "key", color: "text-rose-600", description: "Create strong, unique, and highly secure passwords instantly." },
    { name: "Advanced QR Code Generator", url: "../tools/qr-generator.html", category: "Misc", icon: "qr-code", color: "text-pink-500", description: "Generate highly customizable QR codes with logo support and high error correction." },
    { name: "UTM Campaign URL Builder", url: "../tools/utm-builder.html", category: "SEO & Marketing", icon: "link", color: "text-blue-600", description: "Create trackable campaign URLs with UTM parameters." },
    { name: "SERP (Search Engine Results Page) Snippet Preview Tool", url: "../tools/serp-previewer.html", category: "SEO & Marketing", icon: "search", color: "text-green-600", description: "See how your page title and meta description look on Google." },
    { name: "Advanced Meta Tag Generator", url: "../tools/meta-tag-generator.html", category: "SEO & Marketing", icon: "tag", color: "text-indigo-600", description: "Generate essential meta tags (title, description, OG) for your pages." },
    { name: "Advanced PDF Merger", url: "../tools/merge-pdf.html", category: "PDF", icon: "files", color: "text-red-600", description: "Combine multiple PDF files into one single document." },
    { name: "PDF Splitter", url: "../tools/split-pdf.html", category: "PDF", icon: "file-minus-2", color: "text-red-500", description: "Extract specific pages or split a PDF into multiple files." },
    { name: "Advanced PDF Compressor", url: "../tools/compress-pdf.html", category: "PDF", icon: "minimize-2", color: "text-red-700", description: "Reduce the file size of your PDF documents." },
    { name: "PDF to JPG/PNG Converter", url: "../tools/pdf-to-jpg.html", category: "PDF", icon: "file-image", color: "text-blue-500", description: "Convert each PDF page into a high-quality JPG image." },
    { name: "Image to PDF Converter", url: "../tools/image-to-pdf.html", category: "PDF", icon: "image", color: "text-blue-600", description: "Combine one or more JPG images into a single PDF file." },
];

const ThemeManager = {
    init() {
        this.updateToggleIcon(document.documentElement.classList.contains('dark'));
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme') {
                this.applyTheme(event.newValue, false);
            }
        });
    },
    applyTheme(theme, save = true) {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        if (save) {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        this.updateToggleIcon(isDark);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
    },
    toggleTheme() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        this.applyTheme(isCurrentlyDark ? 'light' : 'dark');
    },
    updateToggleIcon(isDark) {
        const iconContainer = document.getElementById('theme-toggle');
        if (iconContainer) {
            iconContainer.innerHTML = isDark 
                ? '<i data-lucide="sun" class="w-5 h-5"></i>' 
                : '<i data-lucide="moon" class="w-5 h-5"></i>';
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }
};

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const setupGlobalSearch = (rootPath) => {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    const categoryGrid = document.getElementById('category-grid'); 

    if (!searchInput) return;

    const performSearch = (query) => {
        const q = query.toLowerCase().trim();
        if (q.length < 2) {
            searchResults.classList.add('opacity-0', '-translate-y-2', 'scale-95');
            setTimeout(() => searchResults.classList.add('hidden'), 300);
            return;
        }

        const filteredTools = ALL_TOOLS.filter(tool => tool.name.toLowerCase().includes(q));
        
        if (filteredTools.length > 0) {
            searchResults.innerHTML = filteredTools.map(tool => `
                <a href="${rootPath}${tool.url.replace(/^\.\.\//, '')}" class="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                    <i data-lucide="${tool.icon}" class="w-4 h-4 ${tool.color} mr-3"></i>
                    <div class="flex flex-col overflow-hidden">
                        <div class="text-sm font-medium text-gray-800 dark:text-gray-100">${tool.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${tool.category.replace(/&/g, ' & ')} Tools</div>
                    </div>
                </a>
            `).join('');
            searchResults.classList.remove('hidden');
            setTimeout(() => {
                searchResults.classList.remove('opacity-0', '-translate-y-2', 'scale-95');
            }, 10);
            window.lucide.createIcons();
        } else {
            searchResults.innerHTML = `<div class="p-3 text-gray-500 dark:text-gray-400 text-sm italic">No tools found.</div>`;
            searchResults.classList.remove('hidden');
        }
    };
    
    searchInput.addEventListener('input', debounce((e) => performSearch(e.target.value), 250));
    
    document.addEventListener('click', (e) => {
        const searchContainer = document.getElementById('search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            searchResults.classList.add('opacity-0', '-translate-y-2', 'scale-95');
            setTimeout(() => searchResults.classList.add('hidden'), 300);
            if (categoryGrid && searchInput.value.trim() === '') {
                categoryGrid.style.display = 'grid';
            }
        }
    });
};

window.injectLayout = (includeSearch) => {
    const rootPath = window.GLOBAL_ROOT_PATH || '';
    const body = document.body;
    
    body.insertAdjacentHTML('afterbegin', includeSearch ? HEADER_WITH_SEARCH_HTML(rootPath) : HEADER_WITHOUT_SEARCH_HTML(rootPath));
    body.insertAdjacentHTML('beforeend', FOOTER_HTML(rootPath));
    
    ThemeManager.init();
    
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => ThemeManager.toggleTheme());
    }

    if (includeSearch) {
        setupGlobalSearch(rootPath);
    }

    if (window.lucide) {
       window.lucide.createIcons();
    }
};

window.animateToolCards = (cardSelector = '.tool-card') => {
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll(cardSelector);
        cards.forEach((card, index) => {
            card.classList.add('opacity-0', 'transform', 'translate-y-4', 'transition-all', 'duration-500', 'ease-out');
            
            setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-4');
            }, 100 + (index * 50));
        });
    });
};