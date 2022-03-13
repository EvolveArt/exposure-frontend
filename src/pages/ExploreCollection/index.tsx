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
import { Checkbox } from "@chakra-ui/react";
// import artistWrapper from "../../assets/imgs/artistsWrapper.png";

const ExploreCollection = () => {
  const conRef: any = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState<Collection[]>([]);

  const { ref }: any = useResizeDetector();

  const { getAllCollections } = useApi();

  useEffect(() => {
    const updateCollections = async () => {
      const _collections = await getAllCollections(isAvailable);
      setCollections(_collections.data);
    };

    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAvailable]);

  const handleAvailable = async (event: any, _isAvailable: boolean) => {
    if (event.target.checked) {
      setIsAvailable(_isAvailable);
    } else {
      setIsAvailable(null);
    }

    // console.log(isAvailable);
  };

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
          <div className={styles.filterList}>
            <div className={styles.filterList}>
              <div className={styles.titleFilter}>Availability</div>
              <Checkbox
                paddingBottom={"8px"}
                paddingTop={"8px"}
                onChange={(e) => handleAvailable(e, true)}
              >
                <span className={styles.check}>Available</span>
              </Checkbox>
              <Checkbox onChange={(e) => handleAvailable(e, false)}>
                <span className={styles.check}>Sold Out</span>
              </Checkbox>
            </div>
            <div className={styles.filterList}>
              <div
                className={styles.titleFilter}
                style={{ paddingBottom: "8px" }}
              >
                Photographer
              </div>
              <div className={styles.filterLists}>Add check boxes</div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div
            ref={ref}
            className={styles.exploreAll}
            // onScroll={width > 600 ? handleScroll : null}
          >
            {collections.map((collection: Collection) => {
              return NftItem(collection, false);
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
