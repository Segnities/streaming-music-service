interface Props {
    artistBio: string;
}


function ArtistBio(props: Props) {
    const { artistBio } = props;
    return (
        <div className="mt-8 w-full text-2xl">
            <h3 className="text-gray-100 my-3">Bio</h3>
            <p
                className="text-base text-gray-500"
                dangerouslySetInnerHTML={{ __html: artistBio }}
            />
        </div>
    );
}

export default ArtistBio;