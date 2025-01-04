import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
// use this generic way to integrate mount function from subapp.
// this ensures that it is losely coupled from the framework that is being used in subapp.
// this is react e.g. We can use any framework with similar structure to call mount()
export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname, // if you remove it you will have to click twice on login button to display login
      // used for maintaining history in sub-app
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathName) history.push(nextPathName);
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
