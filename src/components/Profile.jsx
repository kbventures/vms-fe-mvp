import { LitElement, html, css } from 'lit';

class Profile extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .card-header {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .card-content {
      font-size: 1rem;
      margin-bottom: 12px;
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
    fetch('/profile.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.id && data.email && data.schemaVersion && data.name && data.insertedAt) {
          this.profileData = data;
          this.requestUpdate();
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
      <div class="card">
        ${this.profileData.error
          ? html`<p>Error: ${this.profileData.error}</p>`
          : html`
              <div class="card-header">Volunteer Profile</div>
              <div class="card-content">
                <p><strong>ID:</strong> ${this.profileData.id}</p>
                <p><strong>Email:</strong> ${this.profileData.email}</p>
                <p><strong>Name:</strong> ${this.profileData.name}</p>
                <p><strong>Description:</strong> ${this.profileData.description || 'No description available'}</p>
                <p><strong>Created At:</strong> ${this.profileData.happenedAt || 'Not available'}</p>
                <p><strong>Inserted At:</strong> ${this.profileData.insertedAt}</p>
              </div>
            `}
      </div>
    `;
  }
}

customElements.define('volunteer-profile', Profile);
