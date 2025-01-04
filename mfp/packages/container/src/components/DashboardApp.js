import { mount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";
// use this generic way to integrate mount function from subapp.
// this ensures that it is losely coupled from the framework that is being used in subapp.
// this is react e.g. We can use any framework with similar structure to call mount()
export default () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return <div ref={ref} />;
};
