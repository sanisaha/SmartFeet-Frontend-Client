import { PropsWithChildren, ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/data/store";

const appRender = (component: ReactElement, options: RenderOptions = {}) => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };
  return {
    ...render(component, { wrapper: Wrapper, ...options }),
  };
};

export default appRender;
