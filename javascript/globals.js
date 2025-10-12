// --- 1. HTML TEMPLATES ---
const HEADER_WITH_SEARCH_HTML = (rootPath) => `
<header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="${rootPath}index.html" class="flex items-center space-x-2 text-2xl font-bold shrink-0">
            <i data-lucide="tree-deciduous" class="w-6 h-6 stroke-tt-primary"></i> 
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <div class="flex items-center w-full max-w-lg ml-4 sm:ml-8 space-x-3">
            <div class="relative w-full" id="search-container">
                <input type="text" id="global-search" placeholder="Search for any tool..." class="w-full pl-4 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-tt-primary focus:border-tt-primary transition dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100">
                <div id="search-results" class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl hidden z-20 dark:bg-gray-800 dark:border-gray-700"></div>
            </div>
            <button id="theme-toggle" class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-tt-primary shrink-0" aria-label="Toggle dark mode"></button>
        </div>
    </div>
</header>
`;

const HEADER_WITHOUT_SEARCH_HTML = (rootPath) => `
<header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="${rootPath}index.html" class="flex items-center space-x-2 text-2xl font-bold">
            <i data-lucide="tree-deciduous" class="w-6 h-6 stroke-tt-primary"></i> 
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <button id="theme-toggle" class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-tt-primary shrink-0" aria-label="Toggle dark mode"></button>
    </div>
</header>
`;

const FOOTER_HTML = (rootPath) => `
<footer class="text-center text-sm py-6 mt-auto border-t bg-white dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
        <a href="${rootPath}index.html" class="flex items-center space-x-1 text-sm font-bold hover:text-tt-primary transition">
            <i data-lucide="tree-deciduous" class="w-4 h-4 stroke-tt-primary"></i>
            <span class="text-gray-800 dark:text-gray-100">tools<span class="text-tt-primary">Tree</span></span>
        </a>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <span class="flex items-center space-x-1">
            <span>Made with</span>
            <i data-lucide="heart" class="w-4 h-4 text-red-500 fill-current"></i> 
        </span>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <a href="${rootPath}contact.html" class="hover:text-tt-primary">Contact Us</a>
        <span class="text-gray-400 dark:text-gray-600">|</span>
        <a href="${rootPath}privacy.html" class="hover:text-tt-primary">Privacy Policy</a>
    </div>
</footer>
`;

// --- 2. TOOL DATA (Centralized for Global Search) ---
const ALL_TOOLS = [
    { name: "Character Code & Data Converter", url: "tools/data-converter.html", category: "Data & Developer", icon: "replace", color: "text-tt-primary", description: "Convert Unicode, Hex, Binary, Base64, and URL encoding." },
    { name: "JSON Formatter, Validator & Minifier", url: "tools/json-formatter.html", category: "Developer", icon: "box", color: "text-purple-600", description: "Format, validate, and minify your JSON data instantly." },
    { name: "Hash, HMAC & Checksum Generator", url: "tools/hash-generator.html", category: "Developer", icon: "fingerprint", color: "text-red-500", description: "Generate cryptographic hashes from any input text." },
    { name: "Time Zone Converter", url: "tools/time-zone-converter.html", category: "Clock & Time", icon: "globe", color: "text-blue-500", description: "Convert time between multiple global time zones instantly." },
    { name: "Date Calculator", url: "tools/date-calculator.html", category: "Clock & Time", icon: "calendar", color: "text-purple-500", description: "Calculate days between dates or add/subtract time from a date." },
    { name: "Epoch/Unix Time Converter", url: "tools/epoch-converter.html", category: "Clock & Time", icon: "code", color: "text-red-500", description: "Convert human-readable time to Unix/Epoch timestamp and vice-versa." },
    { name: "Case Converter", url: "tools/case-converter.html", category: "Text", icon: "text-cursor-input", color: "text-purple-600", description: "Convert text to UPPERCASE, lowercase, Title Case, and more." },
    { name: "Text Cleaner & Space Remover", url: "tools/remove-spaces.html", category: "Text", icon: "sparkles", color: "text-blue-500", description: "Remove extra spaces, line breaks, and other cleanup tasks." },
    { name: "Advanced Text Reverser", url: "tools/reverse-text.html", category: "Text", icon: "rotate-ccw", color: "text-red-500", description: "Reverse text, words, or lines in multiple configurations." },
    { name: "Loan EMI & Prepayment Calculator", url: "tools/emi-calculator.html", category: "Finance", icon: "banknote", color: "text-blue-500", description: "Estimate your monthly loan payments (EMI) accurately." },
    { name: "SIP Calculator", url: "tools/sip-calculator.html", category: "Finance", icon: "trending-up", color: "text-indigo-600", description: "Project the returns on your Systematic Investment Plan." },
    { name: "Live Currency Converter & Rate Tracker", url: "tools/currency-converter.html", category: "Finance", icon: "dollar-sign", color: "text-teal-500", description: "Convert between various world currencies in real time." },
    { name: "Image Compressor & Resizer", url: "tools/image-compressor.html", category: "Image", icon: "maximize-2", color: "text-indigo-600", description: "Reduce file size and adjust dimensions of your images." },
    { name: "WCAG Color Contrast Checker", url: "tools/contrast-checker.html", category: "Image", icon: "contrast", color: "text-orange-500", description: "Ensure your colors meet WCAG 2.1 accessibility standards." },
    { name: "Secure Password Generator", url: "tools/password-generator.html", category: "Misc", icon: "key", color: "text-rose-600", description: "Create strong, unique, and highly secure passwords instantly." },
    { name: "UUID/GUID Generator", url: "tools/uuid-generator.html", category: "Misc", icon: "grip-vertical", color: "text-red-500", description: "Generate universally unique identifiers for development or tracking." },
    { name: "Compound Interest Calculator", url: "tools/compound-interest.html", category: "Finance", icon: "piggy-bank", color: "text-green-500", description: "Calculate the future value of your investment with compounding." },
    { name: "Headline Title Case Converter", url: "tools/headline-title-case.html", category: "Text", icon: "subtitles", color: "text-purple-600", description: "Formats headlines and titles using proper rules." },
    { name: "Rent vs. Buy Home Calculator", url: "tools/rent-vs-buy-calculator.html", category: "Finance", icon: "scale", color: "text-blue-600", description: "Analyze the financial costs and benefits of renting versus buying." },
    { name: "Advanced CSS Gradient Generator", url: "tools/css-gradient-generator.html", category: "Data & Developer", icon: "palette", color: "text-purple-600", description: "Visually create and customize stunning CSS gradients." },
];

// --- 3. THEME MANAGEMENT LOGIC (FUTURE-PROOF) ---
const ThemeManager = {
    init() {
        // The inline script in <head> handles the initial, synchronous theme application.
        // This `init` function sets up the interactive parts and cross-tab syncing.
        this.updateToggleIcon(document.documentElement.classList.contains('dark'));

        // This listener is critical for syncing theme changes between open tabs.
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme') {
                this.applyTheme(event.newValue, false); // `false` to not re-save
            }
        });
    },
    
    // Applies the theme and optionally saves it to localStorage.
    applyTheme(theme, save = true) {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);

        if (save) {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        
        this.updateToggleIcon(isDark);
        // Dispatch a custom event for other scripts (like charts) to listen to.
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
    },

    // Handles the click on the theme toggle button.
    toggleTheme() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        this.applyTheme(isCurrentlyDark ? 'light' : 'dark');
    },

    // Updates the sun/moon icon in the header.
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

// --- 4. SEARCH & UTILITIES ---
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
            searchResults.classList.add('hidden');
            return;
        }

        const filteredTools = ALL_TOOLS.filter(tool => tool.name.toLowerCase().includes(q));
        
        if (filteredTools.length > 0) {
            searchResults.innerHTML = filteredTools.map(tool => `
                <a href="${rootPath}${tool.url.replace(/^\.\.\//, '')}" class="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <i data-lucide="${tool.icon}" class="w-4 h-4 ${tool.color} mr-3"></i>
                    <div class="flex flex-col overflow-hidden">
                        <div class="text-sm font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">${tool.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${tool.category.replace(/&/g, ' & ')} Tool</div>
                    </div>
                </a>
            `).join('');
            searchResults.classList.remove('hidden');
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
            searchResults.classList.add('hidden');
            if (categoryGrid && searchInput.value.trim() === '') {
                categoryGrid.style.display = 'grid';
            }
        }
    });
};

// --- 5. MAIN LAYOUT INJECTION ---
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

