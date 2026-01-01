// Notification utility functions for BlessedBump PWA

/**
 * Request notification permission from user
 * @returns {Promise<boolean>} True if permission granted, false otherwise
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('⚠️ This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    console.log('✅ Notifications already granted');
    return true;
  }

  if (Notification.permission === 'denied') {
    console.warn('❌ Notifications are blocked');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('✅ Notification permission granted');
      return true;
    } else {
      console.warn('⚠️ Notification permission denied');
      return false;
    }
  } catch (error) {
    console.error('❌ Error requesting notification permission', error);
    return false;
  }
}

/**
 * Check if notification permission is granted
 * @returns {boolean}
 */
export function isNotificationPermissionGranted() {
  if (!('Notification' in window)) {
    return false;
  }
  return Notification.permission === 'granted';
}

/**
 * Show a local notification (doesn't require push service)
 * @param {string} title - Notification title
 * @param {object} options - Notification options
 * @returns {Promise<Notification>}
 */
export async function showLocalNotification(title, options = {}) {
  if (!isNotificationPermissionGranted()) {
    const granted = await requestNotificationPermission();
    if (!granted) {
      throw new Error('Notification permission not granted');
    }
  }

  const defaultOptions = {
    body: '',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: 'blessedbump-notification',
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  return new Notification(title, { ...defaultOptions, ...options });
}

/**
 * Register service worker for push notifications
 * @returns {Promise<ServiceWorkerRegistration|null>}
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ Service Workers are not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('✅ Service Worker registered:', registration.scope);
    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Subscribe to push notifications
 * @param {ServiceWorkerRegistration} registration
 * @returns {Promise<PushSubscription|null>}
 */
export async function subscribeToPush(registration) {
  if (!('PushManager' in window)) {
    console.warn('⚠️ Push messaging is not supported');
    return null;
  }

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: null, // You'll need to add your VAPID key here for production
    });
    console.log('✅ Push subscription successful');
    return subscription;
  } catch (error) {
    console.error('❌ Push subscription failed:', error);
    return null;
  }
}

/**
 * Get current push subscription
 * @param {ServiceWorkerRegistration} registration
 * @returns {Promise<PushSubscription|null>}
 */
export async function getPushSubscription(registration) {
  try {
    const subscription = await registration.pushManager.getSubscription();
    return subscription;
  } catch (error) {
    console.error('❌ Error getting push subscription:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 * @param {PushSubscription} subscription
 * @returns {Promise<boolean>}
 */
export async function unsubscribeFromPush(subscription) {
  try {
    const success = await subscription.unsubscribe();
    console.log('✅ Unsubscribed from push notifications');
    return success;
  } catch (error) {
    console.error('❌ Error unsubscribing from push:', error);
    return false;
  }
}

/**
 * Example: Show reminder notification
 * @param {string} message - Reminder message
 */
export async function showReminderNotification(message) {
  try {
    await showLocalNotification('BlessedBump Reminder', {
      body: message,
      tag: 'reminder',
      requireInteraction: false,
    });
  } catch (error) {
    console.error('❌ Error showing reminder:', error);
  }
}

/**
 * Example: Show milestone notification
 * @param {string} milestone - Milestone message
 */
export async function showMilestoneNotification(milestone) {
  try {
    await showLocalNotification('🎉 New Milestone!', {
      body: milestone,
      tag: 'milestone',
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
    });
  } catch (error) {
    console.error('❌ Error showing milestone:', error);
  }
}

