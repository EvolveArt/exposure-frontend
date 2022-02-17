import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useResizeDetector } from "react-resize-detector";
import useWindowDimensions from "hooks/useWindowDimensions";
import iconCollapse from "assets/imgs/collapse.png";
import cx from "classnames";
import Header from "components/Header";

const ExploreCollection = () => {
  const conRef = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const { ref } = useResizeDetector();

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
            {/* <CollectionsGrid
              items={tokens}
              uploading={upFetching}
              loading={downFetching}
              numPerRow={numPerRow}
              category={category}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollection;
