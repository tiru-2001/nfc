import background from '../../assets/images/background.jpg';
import profile from '../../assets/images/profile.jpg';
import styles from '../home/Home.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import configuredUrl from '../../utilities/request';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaPhoneAlt,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const Home = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const { data } = await configuredUrl.get('/user/TirumaleshaE1');
      console.log(data);
      if (data.success) {
        toast.success('user data has been fetched successfully');
        setUserData(data.checkUserExist);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const savetoPhone = () => {
    if (userData) {
      // Constructing vCard (VCF) format for contact information
      const vCardData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${userData?.name}
  TEL:${userData?.phone}
  EMAIL:${userData?.email}
  END:VCARD
  `.trim(); // Ensures no accidental empty spaces before/after

      const blob = new Blob([vCardData], { type: 'text/x-vcard' }); // Changed to text/x-vcard
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${userData?.name || 'contact'}.vcf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } else {
      toast.error('No user data available to download');
    }
  };

  return (
    <section className={styles.homeParent}>
      <section className={styles.homeTop}>
        <img src={background} alt="BackGround Image" />
      </section>
      <section className={styles.profilePic}>
        <img src={profile} alt="profile pic" />
      </section>
      <section className={styles.homeMid}>
        <h2>{userData?.name}</h2>
        <p>Founder of Volar Skateboard Park </p>
      </section>
      <hr />
      <section className={styles.social}>
        <Link className={styles.link} to={userData?.faceBookLink}>
          <FaFacebook />
        </Link>
        <Link className={styles.link} to={userData?.twitterLink}>
          <FaLinkedin />
        </Link>
        <Link className={styles.link} to={userData?.instagramLink}>
          <FaInstagram />
        </Link>
        <Link className={styles.link} to={'https://x.com/?lang=en'}>
          <FaXTwitter />
        </Link>
      </section>
      <hr />
      <section className={styles.contact}>
        <section className={styles.innerContact}>
          <FaPhoneAlt />
          <p>{userData?.phone}</p>
        </section>
        <section className={styles.innerContact}>
          <MdEmail />
          <p>{userData?.email}</p>
        </section>
      </section>
      <hr />
      <section className={styles.button}>
        <button onClick={savetoPhone}>Add to Phone</button>
      </section>
    </section>
  );
};

export default Home;
