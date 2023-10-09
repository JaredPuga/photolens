
export const Photo = ({ photo, deletePhoto, serverBaseUrl }) => {
  return (
    <tr key={photo.id}>
      <td>{photo.id}</td>
      <td>
        <img
          src={`${serverBaseUrl}/uploads/${photo.photo}`} // Usa el nombre del archivo
          alt={`img ${photo.id}`}
          className="img-thumbnail"
        />
      </td>
      <td>{photo.title}</td>
      <td>{photo.description}</td>
      <td>{photo.date}</td>
      <td>
        <button
          onClick={() => deletePhoto(photo.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
