# Contributing to MinSU Systems Platform

Thank you for your interest in contributing to the MinSU Systems Platform! This document provides guidelines and information for contributors to our multi-system platform.

## About This Project

The MinSU Systems Platform is a comprehensive web-based platform built with Laravel 12, Inertia.js v2, React 19, TypeScript, and Shadcn UI. It consists of four integrated systems serving different aspects of Mindoro State University operations:

- **📄 Document Request System (Registrar)**: Automates document request processing for the Registrar's Office
- **🎓 Guidance System**: Student guidance and counseling management
- **📊 Student Affairs and Services (SAS)**: Student affairs and services management
- **🏛️ University Student Government (USG)**: Student government operations and management

## How to Contribute

### 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/leodyversemilla07/minsubc-systems.git
   cd minsubc-systems
   ```

3. **Set up the development environment**:
   ```bash
   # Install PHP dependencies
   composer install

   # Install Node.js dependencies
   npm install

   # Copy environment file
   cp .env.example .env

   # Generate application key
   php artisan key:generate

   # Set up database (MySQL)
   # Configure your .env file with database credentials
   php artisan migrate

   # Build assets
   npm run build
   ```

4. **Start the development server**:
   ```bash
   # Start Laravel server
   php artisan serve

   # Start Vite dev server (in another terminal)
   npm run dev
   ```

### 📝 Development Workflow

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # Or for specific systems:
   git checkout -b feature/registrar/document-validation
   git checkout -b feature/guidance/counseling-module
   git checkout -b feature/sas/event-management
   git checkout -b feature/usg/election-system
   ```

2. **Make your changes** following our coding standards

3. **Run tests** to ensure everything works:
   ```bash
   # Run PHP tests
   php artisan test

   # Run frontend linting
   npm run lint

   # Format code
   npm run format
   ```

4. **Commit your changes** with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "feat(registrar): add document request validation"
   ```

5. **Push to your fork** and **create a pull request**

### 🏗️ System Architecture

This platform uses a modular architecture:

```
app/Modules/
├── Guidance/     # Student guidance and counseling
├── Registrar/    # Document request system
├── SAS/          # Student affairs and services
└── USG/          # Student government operations

resources/js/pages/
├── guidance/     # Frontend pages for guidance system
├── registrar/    # Frontend pages for document system
├── sas/          # Frontend pages for student affairs
└── usg/          # Frontend pages for student government
```

### 🛠️ Development Standards

#### PHP/Laravel Standards
- Follow PSR-12 coding standards
- Use Laravel Pint for code formatting: `vendor/bin/pint`
- Write descriptive commit messages
- Add PHPDoc blocks for classes and methods
- Use explicit return types and type hints
- Follow module-based architecture for new features

#### React/TypeScript Standards
- Use functional components with TypeScript
- Follow the existing component structure
- Use Shadcn UI components when possible
- Run ESLint: `npm run lint`
- Format code with Prettier: `npm run format`
- Organize components by system/module

#### Module Development
- Each system should be self-contained within its module
- Shared logic goes in `app/Services/` or `app/Http/Controllers/`
- Follow consistent naming conventions across modules
- Document inter-module dependencies

#### Testing
- Write Pest tests for new features
- Maintain test coverage above 80%
- Run tests before committing: `php artisan test`
- Test both individual modules and integration points

### 📋 Pull Request Guidelines

**Before submitting a pull request:**

1. **Specify the target system** in your PR title and description
2. **Update documentation** if your changes affect user-facing features
3. **Add tests** for new functionality
4. **Ensure all tests pass**
5. **Update the changelog** if applicable
6. **Follow commit message conventions**

**Pull request title format:**
```
type(system:scope): description

Systems: guidance, registrar, sas, usg, shared
Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(registrar:documents): add COE request validation
- fix(guidance:counseling): resolve session booking bug
- feat(sas:events): implement event registration system
- refactor(shared:auth): improve user role management
```

### 🐛 Reporting Issues

When reporting bugs, please include:

1. **Specify which system** the issue affects
2. **Clear title** describing the issue
3. **Steps to reproduce** the problem
4. **Expected behavior** vs. actual behavior
5. **Environment details** (PHP version, Node version, OS)
6. **Screenshots** if applicable
7. **Browser console errors** if frontend-related

### 💡 Feature Requests

For feature requests:

1. **Specify which system** the feature is for
2. **Check existing issues** to avoid duplicates
3. **Provide detailed description** of the proposed feature
4. **Explain the use case** and benefits
5. **Consider implementation complexity**
6. **Consider cross-system impacts**

### 📚 Documentation

- **DRS.md**: Technical documentation for the Document Request System
- **DIRECTORY_STRUCTURE.md**: Complete project file structure guide
- **README.md**: Project overview and setup instructions
- **System-specific docs**: Each module may have additional documentation

### 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

### 📞 Getting Help

If you need help:

1. **Check the documentation** (DRS.md, DIRECTORY_STRUCTURE.md, system docs)
2. **Search existing issues** on GitHub
3. **Ask in discussions** for general questions
4. **Contact maintainers** for urgent issues

### 🎯 Development Priorities

**Current Focus Areas:**
- **Registrar System**: Document request processing and payment integration
- **Guidance System**: Counseling session management and student support
- **SAS System**: Event management and student services
- **USG System**: Election system and governance tools

**Cross-System Features:**
- Unified authentication and user management
- Shared notification system
- Common UI components and design system
- Integrated reporting and analytics

### 🙏 Recognition

Contributors will be recognized in:
- GitHub repository contributors list
- Changelog for significant contributions
- Project documentation acknowledgments
- System-specific contributor credits

Thank you for contributing to the MinSU Systems Platform! 🎓📄🎯🏛️