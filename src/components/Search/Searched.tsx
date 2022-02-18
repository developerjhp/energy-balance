interface Props {
  searchedName: string;
}
function Searched({ searchedName }: Props) {
  return (
    <>
      <div className='item-name'>{searchedName}</div>
    </>
  );
}
export default Searched;
