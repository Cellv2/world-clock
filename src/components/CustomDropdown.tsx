import React from "react";
import Select, { ValueType, components } from "react-select";

const { ValueContainer, Placeholder } = components;

//@ts-ignore
const CustomValueContainer = ({ children, ...props }) => {
    return (
        //@ts-ignore
        <ValueContainer {...props}>
            {/*
            //@ts-ignore */}
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(children, (child) =>
                child && child.type !== Placeholder ? child : null
            )}
        </ValueContainer>
    );
};

type Props = {
    options: {value: string, label: string}[];
    label: string;
    name: string;
    handleOnChange: (event: ValueType<{value: string, label: string}>) => void;
}

const CustomDropdown = (props: Props) => {
    return (
        <Select
            options={props.options}
            onChange={props.handleOnChange}
            placeholder={props.label}
            isSearchable
            components={{
                ValueContainer: CustomValueContainer,
            }}
            styles={{
                container: (provided, state) => ({
                    ...provided,
                    marginTop: 50,
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    overflow: "visible",
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    position: "absolute",
                    top:
                        state.hasValue || state.selectProps.inputValue
                            ? -15
                            : "50%",
                    transition: "top 0.1s, font-size 0.1s",
                    fontSize:
                        (state.hasValue || state.selectProps.inputValue) && 13,
                }),
            }}
        />
    );
}

export default CustomDropdown;
