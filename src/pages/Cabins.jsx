import CabinTable from '../features/cabins/CabinTable.jsx';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinModal from '../features/cabins/CabinModal.jsx';
import CabinTableOperations from '../features/cabins/CabinTableOperations.jsx';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <CabinModal />
      </Row>
    </>
  );
}

export default Cabins;
