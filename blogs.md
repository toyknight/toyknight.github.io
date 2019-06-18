---
layout: default
title: Blog Archive
package: net.toyknight.blogs
permalink: /blogs/
---
<div class="page-content wc-container">
  	<h3>Blog Archive</h3><br/>
  	{% for post in site.posts %}
		{% if post.categories contains "blog" %}
			<!-- {% unless forloop.first %}</ul>{% endunless %} -->
  			{% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
  			{% if currentyear != year %}
    			<h6>{{ currentyear }}</h6>
    			<ul class="posts">
    			{% capture year %}{{currentyear}}{% endcapture %}
  			{% endif %}
    		<li><a href="{{ post.url }}">{{ post.title }}</a></li>
		{% endif %}
		{% if forloop.last %}</ul>{% endif %}
	{% endfor %}
</div>
