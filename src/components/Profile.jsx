import { LitElement, html, css } from 'lit';  // Import from the 'lit' package

class Profile extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
  `;

  static properties = {
    profileData: { type: Object },
  };

  constructor() {
    super();
    this.profileData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    // Fetch the profile data from /profile.json
    fetch('/profile.json')
      .then((response) => response.json())
      .then((data) => {
        // Validate required fields based on schema
        if (data.id && data.email && data.schemaVersion && data.name && data.insertedAt) {
          this.profileData = data;
          this.requestUpdate(); // Make sure to trigger an update after data is loaded
        } else {
          console.error('Missing required profile fields');
          this.profileData = { error: 'Required fields missing in profile data.' };
        }
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        this.profileData = { error: 'Failed to load profile data.' };
      });
  }

  render() {
    return html`
      <div>
        ${this.profileData.error
          ? html`<p>Error: ${this.profileData.error}</p>`
          : html`
              <h1>Volunteer Profile</h1>
              <p><strong>ID:</strong> ${this.profileData.id}</p>
              <p><strong>Email:</strong> ${this.profileData.email}</p>
              <p><strong>Name:</strong> ${this.profileData.name}</p>
              <p><strong>Description:</strong> ${this.profileData.description || 'No description available'}</p>
              <p><strong>Created At:</strong> ${this.profileData.happenedAt || 'Not available'}</p>
              <p><strong>Inserted At:</strong> ${this.profileData.insertedAt}</p>
            `}
      </div>
    `;
  }
}

customElements.define('volunteer-profile', Profile);
