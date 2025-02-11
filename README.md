# axpo_exercise by David Pérez Campos
Exercise with Playwright Test

# Project structure 📁
📦 AXPO_Exercise  
├── 📁 01_ui                            # UI layers folder
│   ├── 📁 pages                        # Pages with components folder
│   │   ├── 📄 init.page.js             # Page for initialization
│   │   └── 📄 reqApiKey.page.js        # Page for requesting an API Key  
│   ├── 📁 resources                    # Resources folder
│   │   ├── 📄 hooks.js                 # Hooks for UI test management
│   │   ├── 📄 utils.js                 # Utility functions
│   │   └── 📁 data                     # Test data folder
│   │       └── 📄 data.js              # Data file
│  
├── 📁 02_api                           # API layers folder 
│   ├── 📁 apis                         # APIs folder
│   │   ├── 📄 antartida.apis.js        # API requests related to Antartida
│   ├── 📁 resources                    # Resources folder
│   │   ├── 📄 hooks.js                 # Hooks for API test management  
│   │   ├── 📄 utils.js                 # Utility functions
│   │   ├── 📁 data                     # Test data folder
│   │   │   └── 📄 data.js              # Data file
│   │   └── 📁 responses                # Expected API responses
│   │       ├── 📄 antartida.json       # Sample response for Antarctica API
│   │       ├── 📄 datos.json           # Sample response related to datos
│   │       └── 📄 noDataAntartida.json # Response for missing data in Antarctica API  
│   ├── 📁 services                     # Service layer for API logic  
│   │   └── 📄 antartida.services.js    # Service logic for Antarctica API  
│   ├── 📁 output                       # Folder for storing test execution results  
│   ├── 📁 tests                        # Test cases for UI and API  
│   │   ├── 📄 api.test.js              # API test cases  
│   │   └── 📄 ui.test.js               # UI test cases  
│  
├── 📄 package-lock.json                # Lock file for installed dependencies
├── 📄 package.json                     # Project dependencies and scripts  
└── 📄 playwright.config.js             # Playwright configuration file

# Framework 🚀
This framework follows a multi-layered architecture to ensure modularity, maintainability, and scalability. It is divided into two main sections:  

- UI Testing: Implements the Page Object Model (POM) pattern.  
  - Layers:  
    - Tests layer: Contains the test cases that validate UI behavior.  
    - Pages layer: Defines reusable page objects that encapsulate UI interactions.  

- API Testing: Follows a structured three-layer architecture for better separation of concerns.  
  - Layers:  
    - Tests layer: Contains test cases that validate API responses.  
    - Services layer: Implements business logic and complex API workflows.  
    - APIs layer: Manages direct API requests and interactions.  

# How to run 🔥
Command to Run both UI and API tests together: npx playwright test
Command to run all UI tests: npx playwright ui
Command to run all API tests: npx playwright api
Command to open the report: npx playwright show-report


