import { Card, CardContent, styled, Typography } from "@mui/material";
export const Quote = ({
    text,
    author,
    right,
}: {
    text: string;
    author: string;
    right?: boolean;
}) => {
    const Span = styled("span")({});

    return (
        <Card
            sx={{
                minWidth: 250,
                maxWidth: 500,
                alignSelf: ["inherit", null, right ? "flex-end" : "flex-start"],
                margin: 2,
                padding: 1,
            }}
            elevation={5}
        >
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="#aaa" variant="h4">
                    <Span sx={{ color: "white" }}>”</Span>
                    {text}
                    <Span sx={{ color: "white" }}>”</Span>
                </Typography>
                <Typography variant="body1" align="right">
                    - {author}
                </Typography>
            </CardContent>
        </Card>
    );
};
