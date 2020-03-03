import React from 'react';

import loggerUtil from "./utils/logger-util";

class ErrorBoundary extends React.Component {

    static getDerivedStateFromError(error) {
        const err = {
            name: error.name,
            message: error.message,
            stack: error.stack
        }
        loggerUtil.err(err);
    }

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        const err = {
            name: error.name,
            message: error.message,
            stack: info.componentStack || error.stack
        }
        loggerUtil.err(err);
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;