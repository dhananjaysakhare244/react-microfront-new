import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
// use this generic way to integrate mount function from subapp.
// this ensures that it is losely coupled from the framework that is being used in subapp.
// this is react e.g. We can use any framework with similar structure to call mount()
export default () => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    mount(ref.current, {
      // used for maintaining history in sub-app
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathName) history.push(nextPathName);
      },
    });
  });
  return <div ref={ref} />;
};
