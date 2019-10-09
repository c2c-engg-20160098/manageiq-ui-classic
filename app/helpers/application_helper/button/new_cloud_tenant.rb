class ApplicationHelper::Button::NewCloudTenant < ApplicationHelper::Button::ButtonNewDiscover
  def disabled?
    # C2C: Added condition for OTC cloud provider
    super || ManageIQ::Providers::Openstack::CloudManager.count == 0 || ManageIQ::Providers::Otc::CloudManager.count == 0
  end
end
