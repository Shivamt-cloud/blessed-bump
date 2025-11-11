import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Community.css';

const threadTabs = [
  {
    key: 'question',
    icon: '❓',
    label: 'Ask & Wonder',
    subtitle: 'Plan, learn, and ask for support',
  },
  {
    key: 'feedback',
    icon: '💖',
    label: 'Share & Uplift',
    subtitle: 'Celebrate wins and offer encouragement',
  },
];

const topicMeta = {
  'pregnancy-journey': {
    icon: '🌱',
    blurb: 'Week-by-week shifts, doctor visits, and tummy flutters',
  },
  'trying-to-conceive': {
    icon: '✨',
    blurb: 'Prep, planning, and hopeful steps toward two lines',
  },
  'baby-care': {
    icon: '🫶',
    blurb: 'Newborn routines, soothing tricks, and nap magic',
  },
  'birth-month-clubs': {
    icon: '🎉',
    blurb: 'Connect with parents welcoming babies the same month',
  },
};

const normalizeRecord = (record) => {
  if (!record) return null;
  const { profiles, ...rest } = record;
  return {
    ...rest,
    authorProfile: profiles ?? null,
  };
};

const getInitial = (profile) => {
  const source =
    profile?.display_name ||
    profile?.baby_nickname ||
    profile?.name ||
    '';
  const initial = source.trim().charAt(0);
  return initial ? initial.toUpperCase() : '✨';
};

const createSnippet = (text, limit = 160) => {
  if (!text) return 'No details shared yet.';
  const trimmed = text.trim();
  if (trimmed.length <= limit) return trimmed;
  return `${trimmed.slice(0, limit)}…`;
};

function Community() {
  const {
    user,
    profile,
    refreshProfile,
    openAuthModal,
  } = useAuth();

  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [topicsError, setTopicsError] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const [activeTab, setActiveTab] = useState('question');
  const [threads, setThreads] = useState([]);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [threadsError, setThreadsError] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [composerOpen, setComposerOpen] = useState(false);
  const [composerTitle, setComposerTitle] = useState('');
  const [composerBody, setComposerBody] = useState('');
  const [composerError, setComposerError] = useState('');
  const [composerSubmitting, setComposerSubmitting] = useState(false);

  const [replyText, setReplyText] = useState('');
  const [replyError, setReplyError] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);

  const activeTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedTopicId) || null,
    [topics, selectedTopicId],
  );

  const fetchTopics = useCallback(async () => {
    setTopicsLoading(true);
    setTopicsError('');
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('id, slug, title, description')
        .order('title', { ascending: true });

      if (error) {
        throw error;
      }

      setTopics(data);
      setSelectedTopicId((prev) => prev ?? data?.[0]?.id ?? null);
    } catch (error) {
      setTopicsError(
        error?.message || 'Unable to load the community circles right now.',
      );
      setTopics([]);
    } finally {
      setTopicsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const fetchThreads = useCallback(async () => {
    if (!selectedTopicId) {
      setThreads([]);
      setThreadsLoading(false);
      return;
    }

    setThreadsLoading(true);
    setThreadsError('');
    try {
      const { data, error } = await supabase
        .from('threads')
        .select(`
          id,
          title,
          body,
          created_at,
          thread_type,
          topic_id,
          author_id,
          authorProfile:profiles!threads_author_profile_fkey(display_name, avatar_url, baby_nickname)
        `)
        .eq('topic_id', selectedTopicId)
        .eq('thread_type', activeTab)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const normalized =
        data?.map((record) =>
          normalizeRecord({
            ...record,
            profiles: record.authorProfile,
          }),
        ).filter(Boolean) ?? [];
      setThreads(normalized);
    } catch (error) {
      setThreadsError(
        error?.message || 'Unable to load conversations for this circle.',
      );
      setThreads([]);
    } finally {
      setThreadsLoading(false);
    }
  }, [activeTab, selectedTopicId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const filteredThreads = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return threads;
    }

    return threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(term) ||
        thread.body?.toLowerCase().includes(term),
    );
  }, [threads, searchTerm]);

  useEffect(() => {
    if (threadsLoading) {
      return;
    }

    if (!filteredThreads.length) {
      setSelectedThreadId(null);
      return;
    }

    setSelectedThreadId((prev) => {
      if (prev && filteredThreads.some((thread) => thread.id === prev)) {
        return prev;
      }
      return filteredThreads[0].id;
    });
  }, [filteredThreads, threadsLoading]);

  const fetchPosts = useCallback(async (threadId) => {
    setPostsLoading(true);
    setPostsError('');
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          body,
          created_at,
          thread_id,
          author_id,
          parent_post_id,
          authorProfile:profiles!posts_author_profile_fkey(display_name, avatar_url, baby_nickname)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      const normalized =
        data?.map((record) =>
          normalizeRecord({
            ...record,
            profiles: record.authorProfile,
          }),
        ).filter(Boolean) ?? [];
      setPosts(normalized);
    } catch (error) {
      setPostsError(
        error?.message || 'Unable to load replies for this conversation.',
      );
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedThreadId) {
      setPosts([]);
      return;
    }

    fetchPosts(selectedThreadId);
  }, [fetchPosts, selectedThreadId]);

  const selectedThread = useMemo(
    () =>
      threads.find((thread) => thread.id === selectedThreadId) || null,
    [threads, selectedThreadId],
  );

  const handleSelectThread = (threadId) => {
    setComposerOpen(false);
    setComposerTitle('');
    setComposerBody('');
    setComposerError('');
    setReplyError('');
    setReplyText('');
    setSelectedThreadId(threadId);
  };

  const handleOpenComposer = async () => {
    if (!user) {
      openAuthModal('login', '/community');
      return;
    }
    if (!profile) {
      await refreshProfile();
    }
    setComposerOpen(true);
    setComposerError('');
  };

  const handleCancelComposer = () => {
    setComposerOpen(false);
    setComposerTitle('');
    setComposerBody('');
    setComposerError('');
  };

  const handleCreateThread = async (event) => {
    event.preventDefault();

    if (!user) {
      openAuthModal('login', '/community');
      return;
    }
    if (!profile) {
      await refreshProfile();
    }

    if (!activeTopic) {
      setComposerError('Choose a circle before starting a conversation.');
      return;
    }

    if (!composerTitle.trim()) {
      setComposerError('Give your conversation a title so others can find it.');
      return;
    }
    if (!composerBody.trim()) {
      setComposerError('Share a few details to help the village respond.');
      return;
    }

    setComposerError('');
    setComposerSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('threads')
        .insert({
          title: composerTitle.trim(),
          body: composerBody.trim(),
          topic_id: activeTopic.id,
          thread_type: activeTab,
          author_id: user.id,
        })
        .select(`
          id,
          title,
          body,
          created_at,
          thread_type,
          topic_id,
          author_id,
          authorProfile:profiles!threads_author_profile_fkey(display_name, avatar_url, baby_nickname)
        `)
        .single();

      if (error) {
        throw error;
      }

      const normalized = normalizeRecord({
        ...data,
        profiles: data?.authorProfile,
      });
      setThreads((prev) =>
        normalized ? [normalized, ...prev] : prev,
      );
      setComposerOpen(false);
      setComposerTitle('');
      setComposerBody('');
      setComposerError('');
      setSearchTerm('');
      if (normalized) {
        setSelectedThreadId(normalized.id);
      }
    } catch (error) {
      setComposerError(
        error?.message || 'Unable to start the conversation. Try again.',
      );
    } finally {
      setComposerSubmitting(false);
    }
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      openAuthModal('login', '/community');
      return;
    }
    if (!profile) {
      await refreshProfile();
    }

    if (!selectedThread) {
      setReplyError('Select a conversation before replying.');
      return;
    }

    if (!replyText.trim()) {
      setReplyError('Your reply is empty. Share a few words first.');
      return;
    }

    setReplyError('');
    setReplySubmitting(true);

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          thread_id: selectedThread.id,
          author_id: user.id,
          body: replyText.trim(),
        })
        .select(`
          id,
          body,
          created_at,
          thread_id,
          author_id,
          parent_post_id,
          authorProfile:profiles!posts_author_profile_fkey(display_name, avatar_url, baby_nickname)
        `)
        .single();

      if (error) {
        throw error;
      }

      const normalized = normalizeRecord({
        ...data,
        profiles: data?.authorProfile,
      });
      setPosts((prev) =>
        normalized ? [...prev, normalized] : prev,
      );
      setReplyText('');
      setReplyError('');
    } catch (error) {
      setReplyError(
        error?.message || 'Unable to share your reply right now.',
      );
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setComposerOpen(false);
    setComposerTitle('');
    setComposerBody('');
    setComposerError('');
    setSearchTerm('');
  };

  const totalReplies = posts.length;

  return (
    <div className="community-page">
      <div className="community-layout">
        <aside className="community-sidebar">
          <div className="community-section-heading">
            <h2>Village circles</h2>
            <p>Select a focus area to explore questions and reflections.</p>
          </div>

          {topicsLoading ? (
            <div className="community-placeholder">Loading circles…</div>
          ) : topicsError ? (
            <div className="community-error">{topicsError}</div>
          ) : topics.length === 0 ? (
            <div className="community-placeholder">
              No circles yet. Add topics in Supabase to get started.
            </div>
          ) : (
            <ul className="community-topic-list">
              {topics.map((topic) => {
                const meta = topicMeta[topic.slug] || {};
                const isActive = topic.id === selectedTopicId;
                return (
                  <li key={topic.id}>
                    <button
                      type="button"
                      className={`community-topic ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setComposerOpen(false);
                        setComposerError('');
                        setSearchTerm('');
                      }}
                    >
                      <div className="topic-main">
                        <span className="topic-icon">{meta.icon || '🌟'}</span>
                        <div>
                          <span className="topic-name">{topic.title}</span>
                          <span className="topic-blurb">
                            {topic.description || meta.blurb || ''}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="community-tabs">
            {threadTabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`thread-tab ${isActive ? 'active' : ''}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <div className="tab-copy">
                    <span className="tab-label">{tab.label}</span>
                    <span className="tab-subtitle">{tab.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="community-sidebar-footer">
            <button
              type="button"
              className="start-thread primary"
              onClick={handleOpenComposer}
            >
              Start a new conversation
            </button>
            <p className="sidebar-footnote">
              Spark joy, ask for help, or drop encouragement. Your voice sets
              the tone of the village.
            </p>
          </div>

          {composerOpen && (
            <form className="thread-composer" onSubmit={handleCreateThread}>
              <div className="thread-composer-header">
                <h3>Launch a new conversation</h3>
                <button
                  type="button"
                  className="composer-cancel"
                  onClick={handleCancelComposer}
                >
                  Cancel
                </button>
              </div>

              {composerError && (
                <div className="composer-error">{composerError}</div>
              )}

              <label htmlFor="composer-title">Conversation title</label>
              <input
                id="composer-title"
                type="text"
                value={composerTitle}
                onChange={(event) => setComposerTitle(event.target.value)}
                placeholder="Give your conversation a guiding headline"
                maxLength={120}
              />

              <label htmlFor="composer-body">Share your story</label>
              <textarea
                id="composer-body"
                value={composerBody}
                onChange={(event) => setComposerBody(event.target.value)}
                placeholder="What is happening? How can the village support you?"
                rows={5}
                maxLength={4000}
              />

              <div className="composer-actions">
                <button
                  type="submit"
                  className="start-thread primary"
                  disabled={composerSubmitting}
                >
                  {composerSubmitting ? 'Posting…' : 'Share with the village'}
                </button>
              </div>
            </form>
          )}
        </aside>

        <main className="community-main">
          <header className="community-main-header">
            <div>
              <h1>Village Voice</h1>
              <p>
                {activeTopic
                  ? `You’re exploring “${activeTopic.title}”. Join in or start something new.`
                  : 'Pick a circle to browse its conversations.'}
              </p>
            </div>
            <div className="community-main-actions">
              <div className="community-search">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search titles and stories"
                />
              </div>
              <button
                type="button"
                className="start-thread ghost"
                onClick={handleOpenComposer}
              >
                Start conversation
              </button>
            </div>
          </header>

          <section className="thread-summary">
            <span>
              {threadsLoading
                ? 'Loading conversations…'
                : `${filteredThreads.length} conversation${
                    filteredThreads.length === 1 ? '' : 's'
                  }`}
            </span>
            {selectedThread && totalReplies > 0 && (
              <span>{`${totalReplies} repl${
                totalReplies === 1 ? 'y' : 'ies'
              }`}</span>
            )}
          </section>

          <div className="thread-columns">
            <div className="thread-list">
              {threadsLoading ? (
                <div className="community-placeholder">
                  Loading conversations…
                </div>
              ) : threadsError ? (
                <div className="community-error">{threadsError}</div>
              ) : filteredThreads.length === 0 ? (
                <div className="empty-state">
                  {threads.length === 0
                    ? 'No conversations yet. Be the first to spark one!'
                    : 'No conversations match your search. Try a different keyword.'}
                </div>
              ) : (
                filteredThreads.map((thread) => {
                  const isActive = thread.id === selectedThreadId;
                  return (
                    <button
                      type="button"
                      key={thread.id}
                      onClick={() => handleSelectThread(thread.id)}
                      className={`thread-card ${isActive ? 'active' : ''}`}
                    >
                      <div className="thread-card-top">
                        <span className="thread-card-chip">
                          {
                            threadTabs.find(
                              (tab) => tab.key === thread.thread_type,
                            )?.label || thread.thread_type
                          }
                        </span>
                        <span className="thread-card-time">
                          {formatDistanceToNow(new Date(thread.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <h3 className="thread-card-title">{thread.title}</h3>
                      <p className="thread-card-body">
                        {createSnippet(thread.body)}
                      </p>
                      <div className="thread-card-meta">
                        <div className="thread-card-author">
                          <span className="avatar">
                            {getInitial(thread.authorProfile)}
                          </span>
                          <div>
                            <span className="author-name">
                              {thread.authorProfile?.display_name ||
                                'Glowfriend'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="thread-detail">
              {selectedThread ? (
                <>
                  <div className="thread-detail-header">
                    <div className="thread-detail-heading">
                      <span className="thread-card-chip">
                        {
                          threadTabs.find(
                            (tab) => tab.key === selectedThread.thread_type,
                          )?.label || selectedThread.thread_type
                        }
                      </span>
                      <h2>{selectedThread.title}</h2>
                    </div>
                    <div className="thread-detail-author">
                      <span className="avatar large">
                        {getInitial(selectedThread.authorProfile)}
                      </span>
                      <div>
                        <span className="author-name">
                          {selectedThread.authorProfile?.display_name ||
                            'Glowfriend'}
                        </span>
                        <span className="thread-card-time">
                          {formatDistanceToNow(
                            new Date(selectedThread.created_at),
                            { addSuffix: true },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="thread-detail-body">
                    {selectedThread.body
                      ?.split('\n')
                      .map((line, index) =>
                        line.trim() ? (
                          <p key={index}>{line}</p>
                        ) : (
                          <span key={index} className="thread-break" />
                        ),
                      )}
                  </div>

                  <h3 className="thread-replies-title">Replies</h3>

                  {postsError && (
                    <div className="community-error">{postsError}</div>
                  )}

                  {postsLoading ? (
                    <div className="community-placeholder">
                      Loading replies…
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="empty-state">
                      No replies yet. Be the first to respond.
                    </div>
                  ) : (
                    <div className="post-list">
                      {posts.map((post) => (
                        <div key={post.id} className="post-card">
                          <div className="post-author">
                            <span className="avatar">
                              {getInitial(post.authorProfile)}
                            </span>
                            <div>
                              <span className="author-name">
                                {post.authorProfile?.display_name ||
                                  'Glowfriend'}
                              </span>
                              <span className="post-time">
                                {formatDistanceToNow(
                                  new Date(post.created_at),
                                  { addSuffix: true },
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="post-body">
                            {post.body
                              ?.split('\n')
                              .map((line, index) =>
                                line.trim() ? (
                                  <p key={index}>{line}</p>
                                ) : (
                                  <span key={index} className="thread-break" />
                                ),
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="reply-composer">
                    {!user ? (
                      <div className="auth-reminder">
                        <p>Sign in to leave a reply.</p>
                        <button
                          type="button"
                          onClick={() => openAuthModal('login', '/community')}
                        >
                          Sign in
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleReplySubmit}>
                        {replyError && (
                          <div className="composer-error">{replyError}</div>
                        )}

                        <textarea
                          value={replyText}
                          onChange={(event) => setReplyText(event.target.value)}
                          placeholder="Add your reply…"
                          rows={4}
                          maxLength={5000}
                        />

                        <div className="reply-actions">
                          <span className="reply-count">
                            {replyText.trim().length}/5000
                          </span>
                          <button
                            type="submit"
                            className="start-thread primary"
                            disabled={replySubmitting}
                          >
                            {replySubmitting ? 'Sharing…' : 'Share reply'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              ) : (
                <div className="thread-detail-empty">
                  {threadsLoading
                    ? 'Loading conversations…'
                    : 'Select a conversation or create a new one to begin.'}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Community;
