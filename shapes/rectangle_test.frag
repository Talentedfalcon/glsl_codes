#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//Solid Border Rectangle
vec3 solid_rect(vec2 st,float x_offset, float y_offset){
    float l=step(x_offset,st.x);
    float r=step(x_offset,1.0-st.x);
    float b=step(y_offset,st.y);
    float t=step(y_offset,1.0-st.y);
    return vec3(l*r*b*t);
}

//Blurred Border Rectangle
vec3 blurred_rect(vec2 st,float x_offset,float y_offset,float blur_factor){
    float l=smoothstep(blur_factor,x_offset,st.x);
    float r=smoothstep(blur_factor,x_offset,1.-st.x);
    float b=smoothstep(blur_factor,y_offset,st.y);
    float t=smoothstep(blur_factor,y_offset,1.-st.y);
    return vec3(l*r*b*t);
}

//Rectangular Outline
vec3 outline_rect(vec2 st,float x_offset,float y_offset,float border_width){
    vec3 pct=vec3(0.);
    pct=solid_rect(st,x_offset,y_offset);
    pct-=solid_rect(st,x_offset+border_width,y_offset+border_width);
    return pct;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    vec3 color=vec3(0.0);

    // color=solid_rect(st,0.1,0.1);
    // color=blurred_rect(st,0.1,0.1,0.);
    color=outline_rect(st,0.1,0.1,0.01);

    gl_FragColor=vec4(color.r*0.5,color.g*st.x,color.b*st.y,1.0);
}