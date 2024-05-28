# `@semanttic/llm-factory`

# LLM FACTORY - Universal LLM API

Welcome to the LLM Factory project! This open-source project aims to provide a single, unified API to work with Large Language Models (LLMs) from various providers, different models, and diverse cloud offerings.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The LLM Factory simplifies the integration and utilization of multiple LLMs, allowing developers to access various models and cloud platforms through a single API interface. This project abstracts the complexities involved in dealing with different providers and their APIs, providing a seamless experience for end-users.

## Features

- **Unified API Interface:** Interact with multiple LLMs using a single API.
- **Multi-Provider Support:** Compatible with various LLM providers such as OpenAI, Google, Microsoft, and more.
- **Cloud Agnostic:** Works with different cloud platforms including AWS, Azure, and GCP.
- **Model Flexibility:** Easily switch between different LLM models without changing your codebase.
- **Extensible and Modular:** Designed to be extended with new providers and models.

## Getting Started

### Prerequisites

- Node.js 14 or higher
- API keys for the LLM providers you intend to use

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/semanttic/llm-factory.git
   cd llm-factory
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Usage

1. Import the LLM Factory in your project:

   ```javascript
   import LLMFactory from "@semanttic/llm-factory";
   ```

2. Initialize the client

   ```javascript
   this.llmFactory = LLMFactory.createLLMs();
   ```

3. Use the API to interact with LLMs:
   ```javascript
   const resp = await llmFactory.createChatCompletion(data.provider, data);
   console.info(resp);
   ```

## Contributing

We welcome contributions to the LLM Factory project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the APACHE 2.0 License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or feedback, please contact us at [support@semanttic.com](mailto:support@semanttic.com).

---

Thank you for using the LLM Factory - Universal LLM API! We hope this project helps you seamlessly integrate and work with multiple LLMs.

---
