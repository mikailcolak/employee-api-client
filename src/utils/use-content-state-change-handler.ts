import { useEffect, useRef } from "react";
import { LoadingState } from "../store/common-types";

export const useContentStateChangeHandler = (contentState: LoadingState, handler: (prevState: LoadingState, contentState: LoadingState) => void) => {
  const refContentState = useRef(contentState);

  useEffect(() => {
    if (contentState !== refContentState.current) {
      handler(refContentState.current, contentState);
    }

    refContentState.current = contentState;
  }, [handler, contentState, refContentState]);

}
