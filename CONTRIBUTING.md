# Contributing to Fast Track

First off, thank you for considering contributing to Fast Track! It's people like you that make Fast Track such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples** to demonstrate the steps
* **Describe the behavior you observed** and what behavior you expected
* **Include screenshots** if possible
* **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description** of the suggested enhancement
* **Provide specific examples** to demonstrate how it would work
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/React style guide
* Include screenshots in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   npm run dev:full
   ```
5. **Ensure code quality**:
   ```bash
   npm run lint
   ```
6. **Commit your changes** with clear commit messages
7. **Push to your fork** and submit a pull request

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
Add bulk upload validation
Fix analytics chart rendering issue
Update README with new API endpoints
```

### Coding Style

**JavaScript/React:**
* 4 spaces for indentation
* Use ES6+ features
* Use functional components with hooks
* Destructure props
* Use meaningful variable names

**Example:**
```javascript
// Good
const BulkUpload = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    
    const handleUpload = async () => {
        // Implementation
    };
    
    return (
        // JSX
    );
};

// Bad
const BulkUpload = (props) => {
    const [f, setF] = useState(null);
    
    return (
        // JSX
    );
};
```

**CSS/Tailwind:**
* Use Tailwind utility classes
* Follow the mobile-first approach
* Keep component styles co-located

## Project Structure

```
fast-track/
├── server/          # Backend code
│   ├── server.js   # Main server
│   └── *.js        # Feature modules
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   └── context/    # React context
└── public/         # Static assets
```

## Adding New Features

### Backend Feature

1. Create a new module in `server/` directory
2. Add endpoints in `server.js`
3. Update API documentation
4. Add tests (future)

### Frontend Feature

1. Create component in `src/components/` or page in `src/pages/`
2. Add route in `App.jsx` if needed
3. Update navigation if needed
4. Test on both light and dark themes

### Adding Dependencies

* Explain why the dependency is needed in the PR
* Keep dependencies minimal
* Prefer packages with good maintenance

## Testing

Currently, the project doesn't have automated tests. When adding tests:

1. Place tests next to the code they test
2. Name test files: `ComponentName.test.jsx`
3. Use Jest and React Testing Library
4. Aim for meaningful tests, not just coverage

## Documentation

* Update README.md for major changes
* Update API_DOCS.md for API changes
* Add JSDoc comments for complex functions
* Include code examples where helpful

## Community

* Be welcoming to newcomers
* Be respectful of differing viewpoints
* Accept constructive criticism gracefully
* Focus on what is best for the community

## Questions?

Don't hesitate to ask questions by creating an issue with the "question" label.

Thank you for contributing! 🎉
