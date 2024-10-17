import { useEffect, useMemo, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Skeleton, Card, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getParticipants } from '../libs/getParticipants';

interface Participant {
  name: string;
  rollNo: string;
  status: string;
}

const ViewParticipants: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState();
  const rowsPerPage = 20;

  const pages = Math.ceil(participants.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return participants.slice(start, end);
  }, [page, participants]);

  const getData = async (eventId: number) => {
    try {
      const data = await getParticipants(eventId); 
      if(data) {
        const newList: Participant[] = data.map((item: string[]) => ({
          name: item[1],
          rollNo: item[0],
          status: item[2]
        }));
        setParticipants(newList);
      } else {
        alert('Error fetching data');
        navigate('/');
      }
    } catch (error) {
      alert('Somthing went wrong or Event not exist!')
      setError(prev => error);
      navigate('/');
    }
  };

  useEffect(() => {
    const eventId = parseInt(window.location.pathname.split('/')[2]);

    if (isNaN(eventId) || !eventId) {
      navigate('/');
      return;
    }

    getData(eventId);
  }, [navigate]);

  return (
    <div className="participant-page-wrapper">
      <h1 className="text-xl font-semibold text-center mb-4">Participants List</h1>
      <div className="participants-list-container">
        {
          participants.length == 0?
          <div>
            <Card className='w-80 h-28 mx-auto'>
              <Skeleton className='w-full h-full' />
            </Card>

          </div>
          :
          <Table
            aria-label="Participants table"
            isHeaderSticky
            className='p-1'
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLL NO</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.rollNo}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.rollNo}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
        {/* {error &&
            <div className='m-6'>
              <h1 className='text-center'>Event not found or something went wrong while fetching data!</h1>
            </div>
        } */}
        <Button onPress={() => navigate('/')} className='mx-auto block mt-2' variant='shadow' color='primary'>
          Go Back
        </Button>
      </div>
      {/* <FabAddButton /> */}
    </div>
  );
};

export default ViewParticipants;
