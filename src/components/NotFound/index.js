import React /*useEffect*/ from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import exposure from "assets/imgs/logo.png";

import styles from "./styles.module.scss";
import Header from "components/Header";

const NotFound = () => {
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(HeaderActions.toggleSearchbar(false));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.body}>
				<img
					src={exposure}
					alt='exposure'
					className={styles.man}
					style={{ filter: "invert(var(--color-logo))" }}
				/>
				<div className={styles.main}>
					<div className={styles.title}>404</div>
					<div className={styles.subtitle}>
						We sadly couldn’t find the page you’re looking for :(
					</div>
					<Link to='/' className={styles.button}>
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
