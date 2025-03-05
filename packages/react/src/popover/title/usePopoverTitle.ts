'use client';
import * as React from 'react';
import { mergeProps } from '../../merge-props';
import { useEnhancedEffect } from '../../utils/useEnhancedEffect';
import { useBaseUiId } from '../../utils/useBaseUiId';
import type { GenericHTMLProps } from '../../utils/types';

export function usePopoverTitle(params: usePopoverTitle.Parameters): usePopoverTitle.ReturnValue {
  const { titleId, setTitleId } = params;

  const id = useBaseUiId(titleId);

  const getTitleProps = React.useCallback(
    (externalProps = {}) => {
      return mergeProps<'h2'>(
        {
          id,
        },
        externalProps,
      );
    },
    [id],
  );

  useEnhancedEffect(() => {
    setTitleId(id);
    return () => {
      setTitleId(undefined);
    };
  }, [setTitleId, id]);

  return React.useMemo(
    () => ({
      getTitleProps,
    }),
    [getTitleProps],
  );
}

namespace usePopoverTitle {
  export interface Parameters {
    titleId: string | undefined;
    setTitleId: React.Dispatch<React.SetStateAction<string | undefined>>;
  }
  export interface ReturnValue {
    getTitleProps: (externalProps?: GenericHTMLProps) => GenericHTMLProps;
  }
}
