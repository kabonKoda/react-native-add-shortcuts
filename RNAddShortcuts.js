import React, { PureComponent } from "react";
import { ViewPropTypes, NativeModules, Platform } from "react-native";
import PropTypes from "prop-types";

import RNImageHelper from "react-native-image-helper";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const { RNAddShortcuts } = NativeModules;

let _initialShortcut = RNAddShortcuts && RNAddShortcuts.initialShortcut;

class AddShortcuts extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,
  };

  static defaultProps = {};

  static AddDynamicShortcut(props) {
    if (props.icon && props.icon.props) {
      props.icon = props.icon.props;

      let vectorIcon = RNImageHelper.Resolve(
        props.icon.family,
        props.icon.name
      );
      props.icon = Object.assign({}, props.icon, vectorIcon);
    } else if (props.icon !== undefined) {
      if (typeof props.icon === "number") {
        props.icon = {
          name: "",
          url: resolveAssetSource(props.icon),
          family: "",
          glyph: "",
          color: "",
          size: 0,
        };
      } else if (typeof props.icon === "string") {
        props.icon = {
          name: props.icon,
          url: "",
          family: "",
          glyph: "",
          color: "",
          size: 0,
        };
      }
    } else {
      props.icon = {};
    }

    RNAddShortcuts.AddDynamicShortcut(
      props,
      () => {
        props.onDone?.();
      },
      () => {
        props.onCancel?.();
      }
    );
  }

  static AddPinnedShortcut(props) {
    if (props.icon && props.icon.props) {
      props.icon = props.icon.props;

      let vectorIcon = RNImageHelper.Resolve(
        props.icon.family,
        props.icon.name
      );
      props.icon = Object.assign({}, props.icon, vectorIcon);
    } else if (props.icon !== undefined) {
      if (typeof props.icon === "number") {
        props.icon = {
          name: "",
          url: resolveAssetSource(props.icon),
          family: "",
          glyph: "",
          color: "",
          size: 0,
        };
      } else if (typeof props.icon === "string") {
        props.icon = {
          name: props.icon,
          url: "",
          family: "",
          glyph: "",
          color: "",
          size: 0,
        };
      }
    } else {
      props.icon = {};
    }

    RNAddShortcuts.AddPinnedShortcut(
      props,
      () => {
        props.onDone?.();
      },
      () => {
        props.onCancel?.();
      }
    );
  }

  static GetDynamicShortcuts(props) {
    RNAddShortcuts.GetDynamicShortcuts(
      (shortcuts) => {
        props.onDone?.(shortcuts);
      },
      () => {
        props.onCancel?.();
      }
    );
  }

  static RemoveAllDynamicShortcuts(props) {
    RNAddShortcuts.RemoveAllDynamicShortcuts(
      () => {
        props.onDone?.();
      },
      () => {
        props.onCancel?.();
      }
    );
  }

  static PopDynamicShortcuts(props) {
    RNAddShortcuts.PopDynamicShortcuts(
      props,
      () => {
        props.onDone?.();
      },
      () => {
        props.onCancel?.();
      }
    );
  }

  static PopInitialAction() {
    return new Promise((resolve) => {
      let initialShortcut = _initialShortcut;
      _initialShortcut = null;

      resolve(initialShortcut);
    });
  }
}

export { AddShortcuts as RNAddShortcuts };
