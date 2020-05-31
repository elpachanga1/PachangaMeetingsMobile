import { observable, action } from 'mobx';
import { createContext } from 'react';
import { backendAPIURL } from '../../config';
import axios from 'axios';

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
        // eslint-disable-next-line no-undef
        let formData = new FormData();
        formData.append('image', picture);

        response = await axios.post(
          `${backendAPIURL}/${response.data.body.id}/image`,
          formData,
          config
        );

        newMeeting.picture = response.data.body.picture;
      }

      this.meetings = [...this.meetings, newMeeting];
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
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

      let newPicture = null;
      if (picture) {
        // eslint-disable-next-line no-undef
        let formData = new FormData();
        formData.append('file', picture);
        console.log(formData);

        const response = await axios.post(
          `${backendAPIURL}/${meeting.meeting_id}/image`,
          formData,
          config
        );

        newPicture = response.data.body.picture;
      }

      await axios.put(backendAPIURL, meeting, config);

      let newMeetings = this.meetings.map((x) => {
        return x.id === meeting.meeting_id
          ? {
              ...x,
              title: meeting.title,
              description: meeting.description,
              picture: newPicture,
            }
          : x;
      });

      this.meetings = newMeetings;
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
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
