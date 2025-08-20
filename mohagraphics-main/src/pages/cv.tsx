import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=Mohammed-Abdirahman-CV.pdf');
  
  // Redirect to the PDF file
  return {
    redirect: {
      destination: '/files/cv.pdf',
      permanent: false,
    },
  };
};

// This component won't be rendered, but Next.js requires a default export
export default function CV() {
  return null;
}
