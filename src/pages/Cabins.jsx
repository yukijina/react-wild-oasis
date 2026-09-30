// import { useEffect } from 'react';
// import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useState } from 'react';

function Cabins() {
  // test fetch
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  // test
  const [showForm, setShowFrorm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        {/* temporaly */}
        <Button onClick={() => setShowFrorm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
