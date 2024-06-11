import React from "react";
import { Box, Typography, Checkbox, styled } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes.js";
import useApi from "../hooks/useApi.jsx";
import { API_URLS } from "../services/api.urls.js";

const Wrapper = styled(Box)({
  padding: "0 0 0 10px",
  background: "#f2f6fc",
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  "& > div": {
    display: "flex",
    width: "100%",
    "& > p": {
      fontSize: 14,
    },
  },
});
const Indicator = styled(Box)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginRight: 6,
});

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: 20,
  fontSize: 12,
  color: "#5F6368",
});

const LineClamp = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
});
const Email = ({
  email,
  selectedEmails,
  setRefreshScreen,
  setSelectedEmails,
}) => {
  const navigate = useNavigate();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
  const toggleStarredMails = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };

  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
    }
  };
  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => onValueChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "#FDDA0D" }}
          onClick={() => toggleStarredMails()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredMails()}
        />
      )}

      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography
          style={{
            width: "110px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <LineClamp>
          {email.subject} {email.body && "-"} {email.body}
        </LineClamp>
        <Date>
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Date>
      </Box>
    </Wrapper>
  );
};

export default Email;