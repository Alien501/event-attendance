import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
// import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="max-w-[400px] mx-auto mt-8">
          <CardHeader className="flex gap-3">
            {/* <AlertTriangle className="w-7 h-7 text-danger" /> */}
            <div className="flex flex-col">
              <p className="text-md font-bold">Oops! Something went wrong</p>
              <p className="text-small text-default-500">An error occurred in the application</p>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-small text-default-700">
              {this.state.error && this.state.error.toString()}
            </p>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;