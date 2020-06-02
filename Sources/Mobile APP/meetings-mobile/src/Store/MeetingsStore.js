import { observable, action } from 'mobx';
import { createContext } from 'react';
import { BACKEND_API_URL } from '../../config';
import axios from 'axios';
import FormData from 'form-data';

class MeetingsStore {
  @observable meetings = [];
  @observable state = 'pending'; // "pending" / "done" / "error"

  @action
  async getMeetings() {
    try {
      this.state = 'pending';
      const response = await axios.get(BACKEND_API_URL);

      this.meetings = response.data.body;
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }

  @action
  async addMeeting(token, meeting) {
    const { picture } = meeting;

    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let response = await axios.post(BACKEND_API_URL, meeting, config);

      let newMeeting = { ...meeting, id: response.data.body.id };

      if (picture) {
        let formData = new FormData();

        formData.append('file', {
          uri: picture,
          name: `image.${picture.split('.').pop()}`,
          type: `image/${picture.split('.').pop()}`,
        });

        await axios
          .post(`${BACKEND_API_URL}/${response.data.body.id}/image`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            newMeeting.picture = res.data.body.picture;
          })
          .catch((error) => {
            throw new Error(
              'Error Uploading Image, Your Meeting Has Been Created Without an Image, Try Uploading a valid Image format',
              error
            );
          });
      }

      this.meetings = [...this.meetings, newMeeting];
      this.state = 'done';
      return newMeeting;
    } catch (error) {
      console.log(error);
      this.state = error.message;
    }
  }

  @action
  async editMeeting(token, request) {
    const { picture } = request;

    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let newPicture = '';
      if (picture) {
        let formData = new FormData();
        const extension = picture.split('.').pop();

        formData.append('file', {
          uri: picture,
          name: `image.${extension}`,
          type: `image/${extension}`,
        });

        await axios
          .post(`${BACKEND_API_URL}/${request.meeting_id}/image`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            newPicture = response.data.body.picture;
          })
          .catch((error) => {
            throw new Error(
              'Error Uploading Image, Try Uploading a valid Image format',
              error
            );
          });
      }

      await axios.put(BACKEND_API_URL, request, config);

      let newMeeting = {};
      let newMeetings = this.meetings.map((x) => {
        if (x.id === request.meeting_id) {
          //update the selected element in the meetings array
          const updatedMeeting = {
            ...x,
            title: request.title,
            description: request.description,
          };

          if (newPicture) updatedMeeting.picture = newPicture;
          if (request.location_name)
            updatedMeeting.location_name = request.location_name;
          if (request.latitude) updatedMeeting.latitude = request.latitude;
          if (request.longitude) updatedMeeting.longitude = request.longitude;
          newMeeting = updatedMeeting;
          return updatedMeeting;
        } else return x;
      });

      this.meetings = newMeetings;
      this.state = 'done';
      return newMeeting;
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

      await axios.delete(`${BACKEND_API_URL}/${meeting.id}`, config);

      this.meetings = this.meetings.filter((x) => x.id !== meeting.id);
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }
}

export const MeetingsStoreContext = createContext(new MeetingsStore());
