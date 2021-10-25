const Comment = ({ text }) => {
    return <div dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
};

export default Comment;
