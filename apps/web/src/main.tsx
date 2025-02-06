import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 서버에서 SSR한 후 하이드레이션을 진행합니다.
ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <App />);
