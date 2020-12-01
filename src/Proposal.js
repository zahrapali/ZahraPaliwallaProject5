const Proposal = ({name, status, filePath}) => {
    return(
        <div className="proposal">
            <p>{name}</p>
            <p>{status}</p>
            <p><a href={filePath}>Click for File</a></p>
        </div>
    )
}

export default Proposal;
