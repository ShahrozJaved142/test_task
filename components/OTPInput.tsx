import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  KeyboardType,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextStyle,
  StyleProp
} from "react-native";
import appColors from "../utils/appColors";

interface IState {
  focusedInput: number;
  otpText: string[];
}
interface IProps {
  defaultValue: string;
  inputCount: number;
  containerStyle: ViewStyle;
  textInputStyle: StyleProp<TextStyle>;
  inputCellLength: number;
  tintColor: string | string[];
  offTintColor: string | string[];
  handleTextChange(text: string): void;
  onComplete(text: string): void;
  handleCellTextChange?: (text: string, cellIndex: number) => void;
  keyboardType: KeyboardType;
  testIDPrefix: string;
  autoFocus: boolean;
  otpError: boolean;
}

const DEFAULT_TINT_COLOR: string = appColors.primary;
const DEFAULT_OFF_TINT_COLOR: string = appColors.grayC5;
const DEFAULT_ERROR_COLOR: string = appColors.error;
const DEFAULT_BACKGROUND_COLOR: string = appColors.white;
const DEFAULT_TEST_ID_PREFIX: string = "otp_input_";
const DEFAULT_KEYBOARD_TYPE: KeyboardType = "numeric";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    margin: 5,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: DEFAULT_TINT_COLOR,
    height: 58,
    minWidth: 58,
    maxWidth: 58,
    // alignItems: 'center',
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    // marginTop: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: DEFAULT_TINT_COLOR,

  },
  errorCodeContainerStyle: {
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: DEFAULT_ERROR_COLOR
  },
  verifyCodeContainerStyle: {
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: DEFAULT_TINT_COLOR,
  },
});

class OTPTextView extends Component<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    defaultValue: "",
    inputCount: 4,
    tintColor: DEFAULT_TINT_COLOR,
    offTintColor: DEFAULT_OFF_TINT_COLOR,
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => { },
    onComplete: () => { },
    keyboardType: DEFAULT_KEYBOARD_TYPE,
    testIDPrefix: DEFAULT_TEST_ID_PREFIX,
    autoFocus: false,
    otpError: false
  };

  inputs: TextInput[];

  timeoutRef: any = null

  constructor(props: IProps) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: this.getOTPTextChucks(
        props.inputCount || 4,
        props.inputCellLength,
        props.defaultValue
      ),
    };

    this.inputs = [];

    this.checkTintColorCount();
  }

  getOTPTextChucks = (inputCount: number, inputCellLength: number, text: string): string[] => {
    let matches =
      text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];

    return matches.slice(0, inputCount);
  };

  checkTintColorCount = () => {
    const { tintColor, offTintColor, inputCount } = this.props;

    if (typeof tintColor !== "string" && tintColor.length !== inputCount) {
      throw new Error(
        "If tint color is an array it's length should be equal to input count"
      );
    }

    if (
      typeof offTintColor !== "string" &&
      offTintColor.length !== inputCount
    ) {
      throw new Error(
        "If off tint color is an array it's length should be equal to input count"
      );
    }
  };

  basicValidation = (text: string) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text: string, i: number) => {
    const { inputCellLength, inputCount, handleTextChange, handleCellTextChange, onComplete } = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState: IState) => {
        let { otpText } = prevState;

        otpText[i] = text;

        return {
          otpText,
        };
      },
      () => {
        const codeText = this.state.otpText.join("")
        handleTextChange(codeText);
        handleCellTextChange && handleCellTextChange(text, i);
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
        if (codeText?.length == 4) onComplete(codeText);
      }
    );
  };

  onInputFocus = (i: number) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex]) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i }, () => {
      clearTimeout(this.timeoutRef)
      this.timeoutRef = setTimeout(() => {
        const { focusedInput } = this.state
        if (focusedInput == 4) return
        this.setState({ otpText: otpText.slice(0, focusedInput) })
      }, 100);
    });
  };

  onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => {
    const val = this.state.otpText[i] || "";
    const { handleTextChange, inputCellLength, inputCount } = this.props;
    const { otpText } = this.state;
    const prevIndex = i - 1;

    if (prevIndex > -1 && e.nativeEvent.key !== "Backspace" && val && i !== inputCount - 1) {
      this.inputs[prevIndex].focus();
      return;
    }

    if (prevIndex > -1 && e.nativeEvent.key === "Backspace" && i !== 0) {
      if (!val.length && otpText[prevIndex].length === inputCellLength) {
        this.setState(
          (prevState) => {
            let { otpText } = prevState;

            otpText[prevIndex] = otpText[prevIndex]
              .split("")
              .splice(0, otpText[prevIndex].length - 1)
              .join("");

            return {
              otpText,
            };
          },
          () => {
            handleTextChange(this.state.otpText.join(""));
            this.inputs[prevIndex].focus();
          }
        );
      }
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
        this.props.handleTextChange("");
      }
    );
  };

  setValue = (value: string, isPaste: boolean = false) => {
    const { inputCount, inputCellLength } = this.props;

    const updatedFocusInput = isPaste ? inputCount - 1 : value.length - 1;

    this.setState(
      {
        otpText: this.getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }

        this.props.handleTextChange(value);
      }
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      testIDPrefix,
      autoFocus,
      otpError = false,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const _tintColor =
        typeof tintColor === "string" ? tintColor : tintColor[i];
      const _offTintColor =
        typeof offTintColor === "string" ? offTintColor : offTintColor[i];

      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {
          borderColor: _offTintColor,
        },
      ];
      if (focusedInput === i || (otpText[i] && otpText[i].length > 0)) {
        inputStyle.push({
          borderColor: _tintColor,
        });
      }

      const inputContainer = otpError
        ? styles.errorCodeContainerStyle
        : otpText.length == 4
          ? styles.verifyCodeContainerStyle
          : {};

      TextInputs.push(
        <TextInput
          ref={(e) => {
            if (e) {
              this.inputs[i] = e;
            }
          }}
          key={i}
          autoCorrect={false}
          allowFontScaling={false}
          keyboardType={keyboardType}
          autoFocus={autoFocus && i === 0}
          value={otpText[i] || ""}
          style={[inputStyle, inputContainer]}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => {
            this.onTextChange(text, i)
          }}
          multiline={false}
          caretHidden={true}
          placeholder={''}
          onKeyPress={(e) => this.onKeyPress(e, i)}
          selectionColor={_tintColor}
          {...textInputProps}
          testID={`${testIDPrefix}${i}`}
        />
      );
    }

    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  }
}

export default OTPTextView;