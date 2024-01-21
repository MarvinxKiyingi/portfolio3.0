import React from 'react';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h3 className={`heading-h5 ${styles.title}`}>
          I am thrilled to answer any questions you have
        </h3>
      </div>
      <address className={`heading-h5 ${styles.email}`}>
        <a href='mailto:marvinxkiyingi@gmail.com'>marvinxkiyingi@gmail.com</a>
      </address>
    </div>
  );
};

export default Contact;
