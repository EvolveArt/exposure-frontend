import React from "react";
import cx from "classnames";
import addIcon from "../../assets/imgs/plus.png";

import closeIcon from "assets/svgs/close.svg";

import styles from "./styles.module.scss";
import { Image } from "@chakra-ui/react";

const Modal = ({
  visible,
  title,
  onClose,
  children,
  submitDisabled,
  submitLabel,
  onSubmit,
  small,
  secondTitle,
  desc,
}: any) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cx(styles.container, visible ? styles.visible : null)}>
      <div
        className={cx(styles.modal, small && styles.small)}
        onClick={handleClick}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closeButton} onClick={onClose}>
            <img
              src={closeIcon}
              style={{ filter: "invert(var(--color-logo))" }}
              alt="close-icon"
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.title}>{secondTitle}</div>
          <div className={styles.desc}>{desc}</div>
        </div>
        <div className={styles.body}>
          {children}
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"-5px"}
            left="12px"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            top={"-5px"}
            right="12px"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"14px"}
            left="12px"
          ></Image>
          <Image
            src={addIcon}
            opacity="0.1"
            width={"27px"}
            position="absolute"
            bottom={"14px"}
            right="12px"
          ></Image>
        </div>
        {submitLabel && (
          <div className={styles.footer}>
            <div
              className={cx(
                styles.submitButton,
                submitDisabled && styles.disabled
              )}
              onClick={onSubmit}
            >
              {submitLabel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
