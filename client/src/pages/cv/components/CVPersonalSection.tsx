import { FiInfo } from 'react-icons/fi'

interface CVPersonalSectionProps {
    title: string
    setTitle: (value: string) => void
    fullName: string
    setFullName: (value: string) => void
    email: string
    setEmail: (value: string) => void
    phone: string
    setPhone: (value: string) => void
    location: string
    setLocation: (value: string) => void
    linkedinUrl: string
    setLinkedinUrl: (value: string) => void
    githubUrl: string
    setGithubUrl: (value: string) => void
    portfolioUrl: string
    setPortfolioUrl: (value: string) => void
    summary: string
    setSummary: (value: string) => void
    photoUrl: string
    photoPreview: string
    handlePhotoChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleRemovePhoto: () => void
}

export default function CVPersonalSection({
    title,
    setTitle,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    location,
    setLocation,
    linkedinUrl,
    setLinkedinUrl,
    githubUrl,
    setGithubUrl,
    portfolioUrl,
    setPortfolioUrl,
    summary,
    setSummary,
    photoUrl,
    photoPreview,
    handlePhotoChange,
    handleRemovePhoto
}: CVPersonalSectionProps) {
    return (
        <>
            <div className="cv-content-heading">

                <span>
                    STEP 01
                </span>

                <h2>
                    Personal & Professional Summary
                </h2>

                <p>
                    Start with the information
                    employers see first.
                </p>

            </div>

            <div className="cv-editor-panel">

                {/* Profile Photo URL */}

                <div className="form-group">

                    <label>
                        Profile Photo URL
                    </label>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >

                        <div
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#f5f5f5',
                                flexShrink: 0
                            }}
                        >

                            {(
                                photoPreview ||
                                photoUrl
                            ) ? (
                                <img
                                    src={
                                        photoPreview ||
                                        photoUrl
                                    }
                                    alt="Profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <span>
                                    No Photo
                                </span>
                            )}

                        </div>

                        <div>

                            <label
                                htmlFor="profilePhoto"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '150px',
                                    height: '42px',
                                    padding: '0 20px',
                                    borderRadius: '8px',
                                    background: '#6C63FF',
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxSizing: 'border-box'
                                }}
                            >
                                Choose Photo
                            </label>

                            <input
                                id="profilePhoto"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePhotoChange}
                                hidden
                            />

                            {(photoPreview || photoUrl) && (
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    style={{
                                        marginLeft: '10px'
                                    }}
                                >
                                    Remove
                                </button>
                            )}

                            <p
                                style={{
                                    margin: '7px 0 0',
                                    fontSize: '11px',
                                    color: '#6b7280'
                                }}
                            >
                                JPG, PNG or WebP • Maximum 5 MB
                            </p>

                        </div>

                    </div>

                </div>

                {/* Full Name */}

                <div className="form-group">

                    <label htmlFor="fullName">
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) =>
                            setFullName(event.target.value)
                        }
                        placeholder="e.g. Sakshyam Khadka"
                    />

                </div>

                {/* Email */}

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="e.g. sakshyam@example.com"
                    />

                </div>

                {/* Phone */}

                <div className="form-group">

                    <label htmlFor="phone">
                        Phone Number
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) =>
                            setPhone(event.target.value)
                        }
                        placeholder="e.g. +977 98XXXXXXXX"
                    />

                </div>

                {/* Location */}

                <div className="form-group">

                    <label htmlFor="location">
                        Location
                    </label>

                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(event) =>
                            setLocation(event.target.value)
                        }
                        placeholder="e.g. Kathmandu, Nepal"
                    />

                </div>

                {/* LinkedIn */}

                <div className="form-group">

                    <label htmlFor="linkedinUrl">
                        LinkedIn
                    </label>

                    <input
                        id="linkedinUrl"
                        type="url"
                        value={linkedinUrl}
                        onChange={(event) =>
                            setLinkedinUrl(event.target.value)
                        }
                        placeholder="https://linkedin.com/in/username"
                    />

                </div>

                {/* GitHub */}

                <div className="form-group">

                    <label htmlFor="githubUrl">
                        GitHub
                    </label>

                    <input
                        id="githubUrl"
                        type="url"
                        value={githubUrl}
                        onChange={(event) =>
                            setGithubUrl(event.target.value)
                        }
                        placeholder="https://github.com/username"
                    />

                </div>

                {/* Portfolio */}

                <div className="form-group">

                    <label htmlFor="portfolioUrl">
                        Portfolio
                    </label>

                    <input
                        id="portfolioUrl"
                        type="url"
                        value={portfolioUrl}
                        onChange={(event) =>
                            setPortfolioUrl(event.target.value)
                        }
                        placeholder="https://yourportfolio.com"
                    />

                </div>

                {/* CV Title */}

                <div className="form-group">

                    <label htmlFor="title">
                        CV Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="e.g. Software Developer CV"
                        required
                    />

                </div>

                {/* Professional Summary */}

                <div className="form-group">

                    <div className="cv-field-label-row">

                        <label htmlFor="summary">
                            Professional Summary
                        </label>

                        <span>
                            Recommended
                        </span>

                    </div>

                    <textarea
                        id="summary"
                        rows={8}
                        value={summary}
                        onChange={(event) =>
                            setSummary(event.target.value)
                        }
                        placeholder="Write a concise summary of your experience, strengths, skills and career goals..."
                    />

                    <div className="cv-ai-hint">

                        <span>
                            <FiInfo aria-hidden="true" />
                        </span>

                        <p>
                            AI suggestions will
                            appear here in the
                            next phase.
                        </p>

                    </div>

                </div>

            </div>
        </>
    )
}