import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Header from "components/Header";
import { Button, Flex } from "@chakra-ui/react";
import addImage from "../../assets/imgs/addImage.png";
import closeIcon from "assets/svgs/close.svg";

const AddArtist = () => {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [wallet, setWallet] = useState("");
  const [walletError, setWalletError] = useState(null);
  const [twitter, setTwitter] = useState("");
  const [twitterError, setTwitterError] = useState(null);
  const [instagram, setInstagram] = useState("");
  const [instagramError, setInstagramError] = useState(null);

  const removeImage = () => {
    setLogo(null);
  };
  const inputRef = useRef(null);

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = function(e) {
        setLogo(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const validateName = () => {
    if (name.length === 0) {
      setNameError("This field can't be blank");
    } else {
      setNameError("");
    }
  };

  const validateSurname = () => {
    if (surname.length === 0) {
      setSurnameError("This field can't be blank");
    } else {
      setSurnameError("");
    }
  };

  const validateDescription = () => {
    if (description.length === 0) {
      setDescriptionError("This field can't be blank");
    } else {
      setDescriptionError(null);
    }
  };

  const validateWallet = () => {
    if (wallet.length !== 42) {
      setWalletError("Wrong size of address");
    } else {
      setWalletError("");
    }
  };

  const validateTwitter = () => {
    if (twitter.length === 0) {
      setTwitterError("This field can't be blank");
    } else {
      setTwitterError("");
    }
  };

  const validateInstagram = () => {
    if (instagram.length === 0) {
      setInstagramError("This field can't be blank");
    } else {
      setInstagramError("");
    }
  };

  return (
    <>
      <Header />
      <Flex
        width={{ base: "90%", lg: "80%" }}
        minHeight={"80vh"}
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
        paddingTop={"85px"}
        margin="auto"
        gridGap={"24px"}
        zIndex="1"
        paddingBottom={"100px"}
      >
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <div className={styles.logoUploadBox}>
              {logo ? (
                <>
                  <img src={logo} alt="ArtistImage" />
                  <div className={styles.removeOverlay}>
                    <div className={styles.removeIcon} onClick={removeImage}>
                      <img src={closeIcon} alt="CloseIcon" />
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={styles.uploadOverlay}
                  onClick={() => inputRef.current?.click()}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                  />
                  <div className={styles.upload}>
                    <img
                      src={addImage}
                      style={{ width: "25px", margin: "auto" }}
                      alt="AddImage"
                    />
                    <div className={styles.uploadInner}>
                      Ajouter image de Profil
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Prenom</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, surnameError && styles.hasError)}
              maxLength={20}
              placeholder="Prenom Artiste"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onBlur={validateSurname}
            />
            <div className={styles.lengthIndicator}>{surname.length}/20</div>
            {surnameError && <div className={styles.error}>{surnameError}</div>}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Nom</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, nameError && styles.hasError)}
              maxLength={20}
              placeholder="Nom Artiste"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
            />
            <div className={styles.lengthIndicator}>{name.length}/20</div>
            {nameError && <div className={styles.error}>{nameError}</div>}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Description</div>
          <div className={styles.inputWrapper}>
            <textarea
              className={cx(
                styles.input,
                styles.longInput,
                descriptionError && styles.hasError
              )}
              maxLength={200}
              placeholder="Information Complémentaire"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={validateDescription}
            />
            <div className={styles.lengthIndicator}>
              {description.length}/200
            </div>
            {descriptionError && (
              <div className={styles.error}>{descriptionError}</div>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Wallet</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, walletError && styles.hasError)}
              maxLength={42}
              placeholder="Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              onBlur={validateWallet}
            />
            <div className={styles.lengthIndicator}>{wallet.length}/42</div>
            {walletError && <div className={styles.error}>{walletError}</div>}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Twitter</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, twitterError && styles.hasError)}
              maxLength={100}
              placeholder="Twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              onBlur={validateTwitter}
            />
            <div className={styles.lengthIndicator}>{twitter.length}/100</div>
            {twitterError && <div className={styles.error}>{twitterError}</div>}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputTitle}>Instagram</div>
          <div className={styles.inputWrapper}>
            <input
              className={cx(styles.input, instagramError && styles.hasError)}
              maxLength={100}
              placeholder="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              onBlur={validateInstagram}
            />
            <div className={styles.lengthIndicator}>{instagram.length}/100</div>
            {instagramError && (
              <div className={styles.error}>{instagramError}</div>
            )}
          </div>
        </div>
        <Flex border={"1px solid #000"} width="200px" marginRight={"auto"}>
          <Button
            fontSize={"sm"}
            fontWeight={600}
            fontFamily={"Inter"}
            color={"white"}
            bg={"#000"}
            borderRadius="0px"
            width={"200px"}
            height={"64px"}
            style={{ marginInlineStart: "unset" }}
            _hover={{
              transform: "translate3d(4px,4px,0px)",
            }}
          >
            Add Artist
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default AddArtist;
