class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  # validates :content, exclusion: { in: %w(です よろしくお願い致します) }
  validate :data_cannot

  def data_cannot
    text = ["です", "ました", "ます"]
    if text.any? { |t| content.include?(t) }
      errors.add(:base)
    end
  end

  mount_uploader :image, ImageUploader
end
