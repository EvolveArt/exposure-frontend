import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useResizeDetector } from "react-resize-detector";
// import useWindowDimensions from "hooks/useWindowDimensions";
import iconCollapse from "assets/imgs/arrow.png";
import cx from "classnames";
import Header from "components/Header";
import { useApi } from "api";
import NftItem from "components/NFTitem";
// eslint-disable-next-line
import { Collection } from "interfaces";
import Footer from "components/Footer";
import { Flex, Image, Text } from "@chakra-ui/react";
import artistWrapper from "../../assets/imgs/artistsWrapper.png";

const ExploreCollection = () => {
  const conRef: any = useRef();
  const [collapsed, setCollapsed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState<Collection[]>([]);

  const { ref }: any = useResizeDetector();

  const { getAllCollections } = useApi();

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections();
      setCollections(_collections.data);
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div
        ref={conRef}
        className={styles.container}
        // onScroll={width <= 600 ? handleScroll : null}
      >
        <div className={cx(styles.sidebar, collapsed && styles.collapsed)}>
          <div className={styles.sidebarHeader}>
            {!collapsed && <div className={styles.sidebarTitle}>Filter</div>}
            <img
              src={iconCollapse}
              className={styles.iconCollapse}
              onClick={() => setCollapsed(!collapsed)}
              alt="collapse-menu"
            />
          </div>
          <div className={styles.filterList}></div>
        </div>
        <div className={styles.body}>
          <div
            ref={ref}
            className={styles.exploreAll}
            // onScroll={width > 600 ? handleScroll : null}
          >
            {collections.map((collection: Collection) => {
              return NftItem(collection);
            })}
            {/* <CollectionsGrid
							items={collections}
							uploading={upFetching}
							loading={downFetching}
							numPerRow={numPerRow}
							category={category}
						/> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreCollection;
