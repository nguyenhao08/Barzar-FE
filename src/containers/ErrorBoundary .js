import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    console.error("Error occurred:", error);
    console.error("Error info:", info);
    // Cập nhật state để hiển thị thông báo lỗi
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Hiển thị thông báo lỗi hoặc trang fallback
      return <div>Something went wrong. Please try again.</div>;
    }
    // Trả về các thành phần conbình thường trong trường hợp không có lỗi.
    return this.props.children;
  }
}

export default ErrorBoundary;
