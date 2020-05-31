/* eslint-disable no-undef */
import { observable, action } from 'mobx';
import { createContext } from 'react';
import { backendAPIURL } from '../../config';
import axios from 'axios';
import FormData from 'form-data';

class MeetingsStore {
  @observable meetings = [];
  @observable state = 'pending'; // "pending" / "done" / "error"

  @action
  async getMeetings() {
    try {
      this.state = 'pending';
      const response = await axios.get(backendAPIURL);

      this.meetings = response.data.body;
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }

  @action
  async addMeeting(token, meeting, picture) {
    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let response = await axios.post(backendAPIURL, meeting, config);

      let newMeeting = { ...meeting, id: response.data.body.id };

      if (picture) {
        let formData = new FormData();

        formData.append('file', {
          uri: picture,
          name: `image.${picture.split('.').pop()}`,
          type: `image/${picture.split('.').pop()}`,
        });

        await axios
          .post(`${backendAPIURL}/${response.data.body.id}/image`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            newMeeting.picture = res.data.body.picture;
          })
          .catch((error) => {
            axios.delete(`${backendAPIURL}/${response.data.body.id}`, config);
            throw new Error('Error Uploading Image', error);
          });
      }

      this.meetings = [...this.meetings, newMeeting];
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = error.message;
    }
  }

  @action
  async editMeeting(token, meeting, picture) {
    console.log(picture);
    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let newPicture = '';
      if (picture) {
        let formData = new FormData();

        formData.append('file', {
          uri: picture,
          name: `image.${picture.split('.').pop()}`,
          type: `image/${picture.split('.').pop()}`,
        });

        await axios
          .post(`${backendAPIURL}/${meeting.meeting_id}/image`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            newPicture = response.data.body.picture;
          })
          .catch((error) => {
            throw new Error('Error Uploading Image', error);
          });
      }

      await axios.put(backendAPIURL, meeting, config);

      let newMeetings = this.meetings.map((x) => {
        if (x.id === meeting.meeting_id) {
          const updatedMeeting = {
            ...x,
            title: meeting.title,
            description: meeting.description,
          };
          if (newPicture) updatedMeeting.picture = newPicture;
          return updatedMeeting;
        } else return x;
      });

      this.meetings = newMeetings;
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = error.message;
    }
  }

  @action
  async removeMeeting(meeting, token) {
    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${backendAPIURL}/${meeting.id}`, config);

      this.meetings = this.meetings.filter((x) => x.id !== meeting.id);
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }
}

export const MeetingsStoreContext = createContext(new MeetingsStore());
