import React, { useEffect, useMemo, useRef, useState } from 'react';
import { differenceInDays, format } from 'date-fns';
import {
  calculateCurrentWeek,
  getBabySize,
  getTrimester,
} from '../utils/pregnancyCalculator';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const defaultReminders = {
  weeklyDigest: true,
  appointmentReminders: true,
  dailyAffirmations: false,
  communityHighlights: true,
  journalNudges: false,
};

const emptySupportContact = () => ({
  name: '',
  relationship: '',
  phone: '',
  email: '',
});

const toInputDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
};

const toISODate = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
};

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    babyNickname: '',
    partnerName: '',
    providerName: '',
    birthPlan: '',
    lmpDate: '',
    dueDate: '',
    bio: '',
    notes: '',
    communication: 'email',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [reminders, setReminders] = useState(defaultReminders);
  const [supportCircle, setSupportCircle] = useState([emptySupportContact()]);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | saved | error
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const pregnancyRaw = localStorage.getItem('blessedbump_pregnancy_data');
    let storedPregnancy = null;

    if (pregnancyRaw) {
      try {
        storedPregnancy = JSON.parse(pregnancyRaw);
      } catch (error) {
        console.warn('Unable to parse pregnancy data', error);
      }
    }

    setFormData((prev) => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      babyNickname: user.babyNickname || '',
      partnerName: user.partnerName || '',
      providerName: user.providerName || '',
      birthPlan: user.birthPlan || '',
      bio: user.bio || '',
      notes: user.notes || '',
      communication: user.communication || user.preferences?.communication || prev.communication,
      timezone: user.timezone || user.preferences?.timezone || prev.timezone,
      lmpDate: storedPregnancy?.lmpDate || user.lmpDate || prev.lmpDate,
      dueDate:
        toInputDate(storedPregnancy?.dueDate) ||
        toInputDate(user.dueDate) ||
        prev.dueDate,
    }));

    setReminders((prev) => ({
      ...prev,
      ...(user.reminders || {}),
    }));

    setSupportCircle(() => {
      if (Array.isArray(user.supportCircle) && user.supportCircle.length > 0) {
        return user.supportCircle.map((contact) => ({
          name: contact.name || '',
          relationship: contact.relationship || '',
          phone: contact.phone || '',
          email: contact.email || '',
        }));
      }
      return [emptySupportContact()];
    });

    setAvatarPreview(user.avatar || '');
  }, [user]);

  const timeZoneOptions = useMemo(() => {
    if (typeof Intl.supportedValuesOf === 'function') {
      return Intl.supportedValuesOf('timeZone');
    }
    const fallback = [
      formData.timezone,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      'UTC',
    ].filter(Boolean);
    return Array.from(new Set(fallback));
  }, [formData.timezone]);

  const pregnancySnapshot = useMemo(() => {
    if (!formData.dueDate) {
      return null;
    }

    const due = new Date(`${formData.dueDate}T00:00:00`);

    if (Number.isNaN(due.getTime())) {
      return null;
    }

    const weekInfo = calculateCurrentWeek(due);
    const babySize = getBabySize(Math.max(4, Math.min(weekInfo.weeks, 40)));
    const trimester = getTrimester(Math.max(0, weekInfo.weeks));
    const daysRemaining = Math.max(differenceInDays(due, new Date()), 0);
    const totalDays = 280;
    const daysPassed = Math.max(weekInfo.weeks * 7 + weekInfo.days, 0);
    const progressPercent = Math.min(
      100,
      Math.max(Math.round((daysPassed / totalDays) * 100), 0),
    );

    return {
      due,
      weekInfo,
      babySize,
      trimester,
      daysRemaining,
      progressPercent,
    };
  }, [formData.dueDate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleReminder = (key) => {
    setReminders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSupportChange = (index, field, value) => {
    setSupportCircle((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const handleAddSupportContact = () => {
    setSupportCircle((prev) => {
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, emptySupportContact()];
    });
  };

  const handleRemoveSupportContact = (index) => {
    setSupportCircle((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    setUploadError('');

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Please choose an image under 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result?.toString() || '');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleAvatarRemove = () => {
    setAvatarPreview('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('saving');
    setIsSaving(true);

    try {
      const dueISO = toISODate(formData.dueDate);
      const updatedUser = {
        ...user,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        babyNickname: formData.babyNickname.trim(),
        partnerName: formData.partnerName.trim(),
        providerName: formData.providerName.trim(),
        birthPlan: formData.birthPlan,
        bio: formData.bio,
        notes: formData.notes,
        communication: formData.communication,
        timezone: formData.timezone,
        reminders,
        supportCircle,
        avatar: avatarPreview || null,
        dueDate: dueISO,
        lmpDate: formData.lmpDate || null,
      };

      updateUser(updatedUser);

      const pregnancyRaw = localStorage.getItem('blessedbump_pregnancy_data');
      const pregnancyData = pregnancyRaw ? JSON.parse(pregnancyRaw) : {};

      const updatedPregnancyData = {
        ...pregnancyData,
        dueDate: dueISO,
        lmpDate: formData.lmpDate || pregnancyData.lmpDate || null,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        'blessedbump_pregnancy_data',
        JSON.stringify(updatedPregnancyData),
      );

      setStatus('saved');
      setTimeout(() => {
        setStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('Profile update failed', error);
      setStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-hero">
        <div className="profile-hero-left">
          <div className="profile-avatar-frame">
            <button
              type="button"
              className="profile-avatar-button"
              onClick={handleAvatarClick}
              aria-label="Upload profile photo"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile avatar preview" />
              ) : (
                <span className="profile-avatar-placeholder" aria-hidden>
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'You'}
                </span>
              )}
              <span className="avatar-edit-hint">Change photo</span>
            </button>
            {avatarPreview && (
              <button
                type="button"
                className="avatar-remove-btn"
                onClick={handleAvatarRemove}
              >
                Remove
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              hidden
            />
            {uploadError && <p className="upload-error">{uploadError}</p>}
          </div>

          <div className="profile-hero-copy">
            <p className="profile-kicker">Your glow studio</p>
            <h1>{formData.name ? `${formData.name},` : 'Hello beautiful soul,'} keep your journey in sync</h1>
            <p className="profile-summary">
              Update your details, share medical notes, and let BlessedBump tailor
              every milestone, reminder, and celebration around you.
            </p>
          </div>
        </div>

        {pregnancySnapshot ? (
          <div className="profile-hero-insights">
            <div className="insight-row">
              <span className="insight-label">Due date</span>
              <span className="insight-value">
                {format(pregnancySnapshot.due, 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="insight-row">
              <span className="insight-label">Progress</span>
              <span className="insight-value">
                {pregnancySnapshot.progressPercent}% · Week{' '}
                {pregnancySnapshot.weekInfo.weeks}
                <span className="insight-sub">
                  {pregnancySnapshot.weekInfo.days} days into Trimester {pregnancySnapshot.trimester}
                </span>
              </span>
              <div className="insight-progress">
                <div
                  className="insight-progress-fill"
                  style={{ width: `${pregnancySnapshot.progressPercent}%` }}
                />
              </div>
            </div>
            <div className="insight-row">
              <span className="insight-label">Baby right now</span>
              <span className="insight-value">
                {pregnancySnapshot.babySize.size}
                <span className="insight-sub">
                  {pregnancySnapshot.daysRemaining} days to go
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="profile-hero-insights empty">
            <p>Add your due date or LMP to unlock timeline insights.</p>
          </div>
        )}
      </header>

      <form className="profile-form" onSubmit={handleSubmit}>
        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Personal glow</h2>
            <p>Refresh how we address you across the experience.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="profile-field">
              <label htmlFor="babyNickname">Baby nickname</label>
              <input
                id="babyNickname"
                name="babyNickname"
                value={formData.babyNickname}
                onChange={handleInputChange}
                placeholder="Peach, Little Star, etc."
              />
            </div>
            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="profile-field">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Contact number"
              />
            </div>
            <div className="profile-field">
              <label htmlFor="location">Location / Timezone</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
              >
                {timeZoneOptions.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-field">
              <label htmlFor="partnerName">Partner or primary support</label>
              <input
                id="partnerName"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleInputChange}
                placeholder="Who should we celebrate too?"
              />
            </div>
          </div>

          <div className="profile-field full">
            <label htmlFor="bio">About you</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Share a few lines about your pregnancy journey or anything we should know."
            />
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Pregnancy story</h2>
            <p>Keep medical touchpoints and dates ready when you need them.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label htmlFor="dueDate">Estimated due date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="lmpDate">Last menstrual period (LMP)</label>
              <input
                id="lmpDate"
                name="lmpDate"
                type="date"
                value={formData.lmpDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="providerName">Primary care provider</label>
              <input
                id="providerName"
                name="providerName"
                value={formData.providerName}
                onChange={handleInputChange}
                placeholder="Doctor, midwife or clinic"
              />
            </div>
            <div className="profile-field">
              <label htmlFor="birthPlan">Birth preferences</label>
              <input
                id="birthPlan"
                name="birthPlan"
                value={formData.birthPlan}
                onChange={handleInputChange}
                placeholder="Hospital, home birth, doula, etc."
              />
            </div>
          </div>

          <div className="profile-field full">
            <label htmlFor="notes">Medical notes & reminders</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Upcoming tests, questions for your provider, or anything you'd like to remember."
            />
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Reminders & vibe</h2>
            <p>Choose how BlessedBump nudges, cheers, and informs you.</p>
          </div>

          <div className="reminder-grid">
            {Object.entries(reminders).map(([key, value]) => (
              <label key={key} className={`reminder-pill ${value ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleReminder(key)}
                />
                <span>
                  {key === 'weeklyDigest' && 'Weekly journey digest'}
                  {key === 'appointmentReminders' && 'Appointment reminders'}
                  {key === 'dailyAffirmations' && 'Daily affirmations'}
                  {key === 'communityHighlights' && 'Community highlights'}
                  {key === 'journalNudges' && 'Journal nudges'}
                </span>
              </label>
            ))}
          </div>

          <div className="profile-grid compact">
            <div className="profile-field">
              <label htmlFor="communication">Preferred communication</label>
              <select
                id="communication"
                name="communication"
                value={formData.communication}
                onChange={handleInputChange}
              >
                <option value="email">Email updates</option>
                <option value="sms">SMS nudges</option>
                <option value="push">Push notifications</option>
                <option value="none">Keep it minimal</option>
              </select>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Your support circle</h2>
            <p>Keep loved ones and helpers close when milestones arrive.</p>
          </div>

          <div className="support-list">
            {supportCircle.map((contact, index) => (
              <div key={`support-${index}`} className="support-card">
                <div className="support-header">
                  <h3>Contact {index + 1}</h3>
                  {supportCircle.length > 1 && (
                    <button
                      type="button"
                      className="support-remove"
                      onClick={() => handleRemoveSupportContact(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="profile-grid compact">
                  <div className="profile-field">
                    <label htmlFor={`support-name-${index}`}>Name</label>
                    <input
                      id={`support-name-${index}`}
                      value={contact.name}
                      onChange={(event) =>
                        handleSupportChange(index, 'name', event.target.value)
                      }
                      placeholder="Name"
                    />
                  </div>
                  <div className="profile-field">
                    <label htmlFor={`support-relationship-${index}`}>Role in your squad</label>
                    <input
                      id={`support-relationship-${index}`}
                      value={contact.relationship}
                      onChange={(event) =>
                        handleSupportChange(index, 'relationship', event.target.value)
                      }
                      placeholder="Partner, doula, friend..."
                    />
                  </div>
                  <div className="profile-field">
                    <label htmlFor={`support-phone-${index}`}>Phone</label>
                    <input
                      id={`support-phone-${index}`}
                      value={contact.phone}
                      onChange={(event) =>
                        handleSupportChange(index, 'phone', event.target.value)
                      }
                      placeholder="Contact number"
                    />
                  </div>
                  <div className="profile-field">
                    <label htmlFor={`support-email-${index}`}>Email</label>
                    <input
                      id={`support-email-${index}`}
                      type="email"
                      value={contact.email}
                      onChange={(event) =>
                        handleSupportChange(index, 'email', event.target.value)
                      }
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {supportCircle.length < 5 && (
            <button
              type="button"
              className="support-add-btn"
              onClick={handleAddSupportContact}
            >
              + Add another support contact
            </button>
          )}
        </section>

        <div className="profile-actions">
          <button
            type="submit"
            className="profile-save-btn"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save profile'}
          </button>
          {status === 'saved' && (
            <span className="profile-status success">Profile updated ✨</span>
          )}
          {status === 'error' && (
            <span className="profile-status error">Could not save profile, please try again.</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;


