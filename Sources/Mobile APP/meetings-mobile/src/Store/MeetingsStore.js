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
          `${backendAPIURL}/${backendAPIURL}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
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
  async editMeeting(meeting, token) {
    try {
      this.state = 'pending';

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.put(backendAPIURL, meeting, config);

      let newMeetings = this.meetings.map((x) => {
        return x.id === meeting.meeting_id
          ? {
              ...x,
              title: meeting.title,
              description: meeting.description,
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
