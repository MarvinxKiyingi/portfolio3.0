import React from 'react';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h3 className='heading-2'>
          I am thrilled to answer any questions you have
        </h3>
      </div>
      <address className={`${styles.email} link`}>
        <a href='mailto:marvinxkiyingi@gmail.com'>marvinxkiyingi@gmail.com</a>
      </address>
    </div>
  );
};

export default Contact;
