import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useResizeDetector } from "react-resize-detector";
// import useWindowDimensions from "hooks/useWindowDimensions";
import iconCollapse from "assets/imgs/collapse.png";
import cx from "classnames";
import Header from "components/Header";
import { useApi } from "api";

const ExploreCollection = () => {
	const conRef = useRef();
	const [collapsed, setCollapsed] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [collections, setCollections] = useState([]);

	const { ref } = useResizeDetector();

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
							alt='collapse-menu'
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
							items={collections}
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
